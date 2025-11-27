import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { machines, timeSlots, departments } from '../Data/mockdata';
import JobList from '../components/JobList';
import MachineList from '../components/MachineList';
import MachineSchedule from '../components/MachineSchedule';
import Header from '../Styles/Header';
import TabsBar from '../Styles/TabsBar';
import AddJob from '../components/AddJob.jsx';
import { getJobs, createJob, updateJob, getEmployees, getToken, getUser, signOut } from '../api/index.js';
import JobCard from '../components/JobCard.jsx';

function Printing() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState('Printing');
  const [filterMachineId, setFilterMachineId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [jobCardOpen, setJobCardOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [addDefaults, setAddDefaults] = useState({ machineId: '', startSlot: 0 });

  // Redirect if not signed in
  useEffect(() => {
    if (!getToken()) {
      navigate('/signin');
    }
  }, [navigate]);

  // Load tasks from backend
  useEffect(() => {
    async function load() {
      try {
        const [jobData, empData] = await Promise.all([getJobs(), getEmployees()]);
        const mapped = (jobData || []).map((j) => ({
          id: j._id,
          jobId: j.jobId,
          name: j.name,
          description: j.description,
          department: j.department || 'Printing',
          machineId: j.machineId,
          employeeName: j.assignedTo?.name || 'Unassigned',
          assignedTo: j.assignedTo,
          status: j.status,
          startSlot: typeof j.startSlot === 'number' ? j.startSlot : 0,
          durationSlots: typeof j.durationSlots === 'number' ? j.durationSlots : 1,
        }));
        setJobs(mapped);
        setEmployees(empData || []);
      } catch (err) {
        console.error('Failed to load tasks', err);
      }
    }
    load();
  }, []);

  const departmentMachines = useMemo(
    () => machines.filter((m) => m.department === selectedDepartment),
    [selectedDepartment]
  );

  const departmentJobs = useMemo(
    () => jobs.filter((j) => j.department === selectedDepartment),
    [jobs, selectedDepartment]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, bgcolor: 'background.default', overflow: 'hidden' }}>
      <Header
        username={(getUser() && getUser().name) || 'User'}
        subtitle="Manage jobs, machines and an 8-hour shift in each department"
        onLogoff={async () => { await signOut(); navigate('/signin'); }}
        onMenuSelect={(key) => {
          // Placeholder actions for now; wire to real pages later
          if (key === 'profile') {
            // navigate('/profile')
          } else if (key === 'timeclock') {
            // navigate('/timeclock')
          } else if (key === 'phonebook') {
            // navigate('/phonebook')
          }
        }}
      />
      <TabsBar
        departments={departments}
        selected={selectedDepartment}
        onSelect={(dept) => {
          setSelectedDepartment(dept);
          if (dept === 'Printing') {
            navigate('/printing');
          }
        }}
      />
      <Box sx={{ flex: 1, display: 'flex', p: 1.5, gap: 1.5, minHeight: 0, overflow: 'hidden' }}>
      {/* Column 1: Machines */}
      <Paper elevation={2} sx={{ width: { xs: '100%', md: 200 }, flexShrink: 0, display: 'flex', flexDirection: 'column', p: 1.5, minHeight: 0, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="subtitle1" fontWeight={600}>Machines</Typography>
          <Chip label={`${departmentMachines.length} total`} size="small" color="default" variant="outlined" />
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <MachineList machines={departmentMachines} selectedMachineId={filterMachineId} onSelectMachine={setFilterMachineId} />
        </Box>
      </Paper>
      

      {/* Column 2: Jobs */}
      <Paper elevation={2} sx={{ width: { xs: '100%', md: 350 }, flexShrink: 0, display: 'flex', flexDirection: 'column', p: 1.5, minHeight: 0, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1 }}>
          <Typography variant="subtitle1" >Jobs – {selectedDepartment}</Typography>
          <Button size="small" variant="contained" sx={{ width: '100%', mt: 0.5 }} onClick={() => setAddOpen(true)}>New Job</Button>
          <Typography variant="caption" color="text.secondary">Select a job from the list or directly from the schedule.</Typography>
          
        </Box>
        <Divider />
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <JobList
            jobs={departmentJobs}
            filterMachineId={filterMachineId}
            onJobClick={(job) => { setSelectedJob(job); setJobCardOpen(true); }}
          />
        </Box>
      </Paper>

      {/* Column 3: Schedule */}
      <Paper elevation={3} sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', p: 1.5, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1, mb: 1 }}>
          <Box>
            <Typography variant="h6" fontSize="1.05rem">{selectedDepartment} – 8 Hour Shift</Typography>
            <Typography variant="body2" color="text.secondary">Each column is a time slot. Click a job to inspect it or an empty cell to schedule a new job.</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label="Job" color="secondary" size="small" />
            <Chip label="Free" variant="outlined" size="small" />
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <MachineSchedule
            machines={departmentMachines}
            jobs={departmentJobs}
            timeSlots={timeSlots}
            selectedMachineId={filterMachineId}
            onSelectMachine={setFilterMachineId}
            onJobClick={(job) => { setSelectedJob(job); setJobCardOpen(true); }}
            onEmptyCellClick={(machine, slotIndex) => {
              setFilterMachineId(machine.id);
              setAddDefaults({ machineId: machine.id, startSlot: slotIndex });
              setAddOpen(true);
            }}
          />
        </Box>
      </Paper>

      {/* Add Job Modal */}
      <AddJob
        open={addOpen}
        onClose={() => setAddOpen(false)}
        defaultDepartment={selectedDepartment}
        defaultMachineId={addDefaults.machineId || filterMachineId || ''}
        defaultStartSlot={addDefaults.startSlot}
        employees={employees}
        onSubmit={async (payload) => {
          await createJob(payload);
          const jobData = await getJobs();
          const mapped = (jobData || []).map((j) => ({
            id: j._id,
            jobId: j.jobId,
            name: j.name,
            description: j.description,
            department: j.department || 'Printing',
            machineId: j.machineId,
            employeeName: j.assignedTo?.name || 'Unassigned',
            assignedTo: j.assignedTo,
            status: j.status,
            startSlot: typeof j.startSlot === 'number' ? j.startSlot : 0,
            durationSlots: typeof j.durationSlots === 'number' ? j.durationSlots : 1,
          }));
          setJobs(mapped);
        }}
      />

      {/* Job Card Modal */}
      <JobCard
        open={jobCardOpen}
        job={selectedJob}
        onClose={() => setJobCardOpen(false)}
        onEdit={(job) => {
          // In the future, we can open a full edit form
          setJobCardOpen(false);
          setAddDefaults({ machineId: job.machineId, startSlot: job.startSlot });
          setAddOpen(true);
        }}
        onUpdateStatus={async (job, newStatus) => {
          const backendId = job.id;
          await updateJob(backendId, { status: newStatus });
          const jobData = await getJobs();
          const mapped = (jobData || []).map((j) => ({
            id: j._id,
            jobId: j.jobId,
            name: j.name,
            description: j.description,
            department: j.department || 'Printing',
            machineId: j.machineId,
            employeeName: j.assignedTo?.name || 'Unassigned',
            assignedTo: j.assignedTo,
            status: j.status,
            startSlot: typeof j.startSlot === 'number' ? j.startSlot : 0,
            durationSlots: typeof j.durationSlots === 'number' ? j.durationSlots : 1,
          }));
          setJobs(mapped);
        }}
      />
      </Box>
    </Box>
  );
}

export default Printing;

import React, { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import theme from '../theme';
import { departments, jobs, machines, timeSlots } from '../Data/mockdata';
import DepartmentTabs from '../components/DepartmentTabs';
import JobList from '../components/JobList';
import MachineList from '../components/MachineList';
import MachineSchedule from '../components/MachineSchedule';

function Scheduler() {
  const [selectedDepartment, setSelectedDepartment] = useState('Printing');

  const departmentMachines = useMemo(
    () => machines.filter((m) => m.department === selectedDepartment),
    [selectedDepartment]
  );

  const departmentJobs = useMemo(
    () => jobs.filter((j) => j.department === selectedDepartment),
    [selectedDepartment]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static" color="primary" elevation={1}>
          <Toolbar sx={{ gap: 2 }}>
            <Typography variant="h6" component="div">
              Shop Section Scheduler
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.85, display: { xs: 'none', sm: 'block' } }}
            >
              Manage jobs, machines and an 8-hour shift in each department
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Department Tabs */}
        <Paper
          square
          elevation={0}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 2,
            py: 1,
          }}
        >
          <DepartmentTabs
            departments={departments}
            selected={selectedDepartment}
            onSelect={setSelectedDepartment}
          />
        </Paper>

        {/* Main content area: 3-column layout (Jobs, Machines, Schedule) */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            minHeight: 0,
            bgcolor: 'background.default',
            p: 1.5,
            gap: 1.5,
          }}
        >
          {/* Column 1: Jobs */}
          <Paper
            elevation={2}
            sx={{
              width: { xs: '100%', md: 320 },
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              p: 1.5,
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 0.5,
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Jobs – {selectedDepartment}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Select a job from the list or directly from the schedule.
                </Typography>
              </Box>
              <Button size="small" variant="contained" onClick={() => alert('New Job form will go here.')}>New Job</Button>
            </Box>
            <Divider />
            <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <JobList jobs={departmentJobs} />
            </Box>
          </Paper>

          {/* Column 2: Machines */}
          <Paper
            elevation={2}
            sx={{
              width: { xs: '100%', md: 320 },
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              p: 1.5,
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 0.5,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>Machines</Typography>
              <Chip label={`${departmentMachines.length} total`} size="small" color="default" variant="outlined" />
            </Box>
            <Divider sx={{ mb: 1 }} />
            <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <MachineList machines={departmentMachines} />
            </Box>
          </Paper>

          {/* Column 3: Schedule */}
          <Paper
            elevation={3}
            sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', p: 1.5 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 1,
                mb: 1,
              }}
            >
              <Box>
                <Typography variant="h6" fontSize="1.05rem">{selectedDepartment} – 8 Hour Shift</Typography>
                <Typography variant="body2" color="text.secondary">
                  Each column is a time slot. Click a job to inspect it or an empty cell to schedule a new job.
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Chip label="Job" color="secondary" size="small" />
                <Chip label="Free" variant="outlined" size="small" />
              </Stack>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0 }}>
              <MachineSchedule
                machines={departmentMachines}
                jobs={departmentJobs}
                timeSlots={timeSlots}
                onJobClick={(job) => {
                  alert(
                    `Job details:\n\n` +
                      `ID: ${job.jobId}\n` +
                      `Name: ${job.name}\n` +
                      `Employee: ${job.employeeName}\n` +
                      `Machine: ${job.machineId}\n` +
                      `Start: ${timeSlots[job.startSlot]}\n` +
                      `Duration: ${job.durationSlots} slot(s)`
                  );
                }}
                onEmptyCellClick={(machine, slotIndex) => {
                  alert(
                    `Empty slot:\n\n` +
                      `Machine: ${machine.name}\n` +
                      `Time: ${timeSlots[slotIndex]}\n\n` +
                      `Here you can later open a pre-filled "Create Job" form.`
                  );
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Scheduler;

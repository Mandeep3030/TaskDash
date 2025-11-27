// src/components/AddJob.jsx
import React, { useMemo, useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { departments, machines, timeSlots } from '../Data/mockdata';

/*
Reusable AddJob component:
- Props:
  - open: boolean
  - onClose: () => void
  - onSubmit: (payload) => Promise<void> | void
  - defaultDepartment?: string
  - defaultMachineId?: string
  - defaultStartSlot?: number
*/

function AddJob({ open, onClose, onSubmit, employees = [], defaultDepartment = 'Printing', defaultMachineId = '', defaultStartSlot = 0 }) {
  const deptMachines = useMemo(
    () => machines.filter((m) => m.department === defaultDepartment),
    [defaultDepartment]
  );

  const [form, setForm] = useState({
    jobId: '',
    name: '',
    description: '',
    department: defaultDepartment,
    machineId: defaultMachineId || (deptMachines[0]?.id || ''),
    assignedTo: '',
    status: 'pending',
    startSlot: defaultStartSlot,
    durationSlots: 1,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm((f) => ({
      ...f,
      department: defaultDepartment,
      machineId: defaultMachineId || machines.find(m => m.department === defaultDepartment)?.id || '',
      startSlot: defaultStartSlot,
    }));
  }, [defaultDepartment, defaultMachineId, defaultStartSlot, open]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    if (!form.jobId.trim()) return 'Job ID is required';
    if (!form.name.trim()) return 'Name is required';
    if (!form.department.trim()) return 'Department is required';
    if (!form.machineId.trim()) return 'Machine is required';
    if (!form.assignedTo.trim()) return 'Employee selection is required';
    if (Number.isNaN(Number(form.startSlot))) return 'Start slot must be a number';
    if (Number.isNaN(Number(form.durationSlots)) || Number(form.durationSlots) < 1) return 'Duration must be >= 1';
    return '';
  };

  const handleSubmit = async () => {
    const v = validate();
    if (v) { setError(v); return; }
    setError('');
    setSubmitting(true);
    try {
      // Payload matches backend Task model fields introduced earlier
      await onSubmit({
        jobId: form.jobId.trim(),
        name: form.name.trim(),
        description: form.description.trim(),
        department: form.department,
        machineId: form.machineId,
        assignedTo: form.assignedTo,
        status: form.status,
        startSlot: Number(form.startSlot),
        durationSlots: Number(form.durationSlots),
      });
      onClose();
    } catch (e) {
      setError(e?.message || 'Failed to create job');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Job</DialogTitle>
      <DialogContent dividers>
        {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Job ID" value={form.jobId} onChange={handleChange('jobId')} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" value={form.name} onChange={handleChange('name')} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" value={form.description} onChange={handleChange('description')} fullWidth multiline minRows={2} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="Department" value={form.department} onChange={handleChange('department')} fullWidth>
              {departments.map((d) => (<MenuItem key={d} value={d}>{d}</MenuItem>))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="Machine" value={form.machineId} onChange={handleChange('machineId')} fullWidth>
              {machines.filter(m => m.department === form.department).map((m) => (
                <MenuItem key={m.id} value={m.id}>{m.name} ({m.id})</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="Assign Employee" value={form.assignedTo} onChange={handleChange('assignedTo')} fullWidth>
              {employees.map(e => (
                <MenuItem key={e._id} value={e._id}>{e.name} ({e.role})</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="Status" value={form.status} onChange={handleChange('status')} fullWidth>
              {['pending','in-progress','completed','cancelled'].map((s) => (<MenuItem key={s} value={s}>{s}</MenuItem>))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="Start Slot" value={form.startSlot} onChange={handleChange('startSlot')} fullWidth>
              {timeSlots.map((_, idx) => (<MenuItem key={idx} value={idx}>{timeSlots[idx]}</MenuItem>))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="number" label="Duration Slots" value={form.durationSlots} onChange={handleChange('durationSlots')} fullWidth inputProps={{ min: 1 }} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="secondary" disabled={submitting}>Create Job</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddJob;

// src/components/EditJob.jsx
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { machines, timeSlots } from '../Data/mockdata';

/*
EditJob component:
- Props:
  - open: boolean
  - job: mapped job from Printing (id, jobId, name, description, machineId, status, startSlot, durationSlots, employeeName)
  - onClose: () => void
  - onSubmit: (id, patch) => Promise<void> | void
  - onDelete: (id) => Promise<void> | void
*/

function EditJob({ open, job, onClose, onSubmit, onDelete }) {
  const [form, setForm] = useState({
    jobId: '',
    name: '',
    description: '',
    machineId: '',
    assigneeName: '',
    status: 'pending',
    startSlot: 0,
    durationSlots: 1,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open && job) {
      setForm({
        jobId: job.jobId || '',
        name: job.name || '',
        description: job.description || '',
        machineId: job.machineId || machines[0]?.id || '',
        assigneeName: job.employeeName || '',
        status: job.status || 'pending',
        startSlot: typeof job.startSlot === 'number' ? job.startSlot : 0,
        durationSlots: typeof job.durationSlots === 'number' ? job.durationSlots : 1,
      });
    }
  }, [open, job]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    if (!form.jobId.trim()) return 'Job ID is required';
    if (!form.name.trim()) return 'Name is required';
    if (!form.machineId.trim()) return 'Machine is required';
    if (!form.assigneeName.trim()) return 'Assignee name is required';
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
      const patch = {
        jobId: form.jobId.trim(),
        name: form.name.trim(),
        description: form.description.trim(),
        machineId: form.machineId,
        assigneeName: form.assigneeName.trim(),
        status: form.status,
        startSlot: Number(form.startSlot),
        durationSlots: Number(form.durationSlots),
      };
      await onSubmit(job.id, patch);
      onClose();
    } catch (e) {
      setError(e?.message || 'Failed to update job');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Job</DialogTitle>
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
            <TextField select label="Machine" value={form.machineId} onChange={handleChange('machineId')} fullWidth>
              {machines.map((m) => (
                <MenuItem key={m.id} value={m.id}>{m.name} ({m.id})</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Assign Employee (free text)" value={form.assigneeName} onChange={handleChange('assigneeName')} fullWidth placeholder="Type a name" />
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
        {onDelete ? (
          <Button onClick={() => onDelete(job.id)} color="error" variant="outlined" disabled={submitting}>Delete</Button>
        ) : null}
        <Button onClick={handleSubmit} variant="contained" color="secondary" disabled={submitting}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditJob;

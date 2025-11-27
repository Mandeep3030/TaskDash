// src/components/JobList.jsx
import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// Removed ListItemSecondaryAction to avoid overlap; we'll render status inline
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

/* eslint-disable react/prop-types */
function JobList({ jobs, filterMachineId = null, onJobClick }) {
  if (!jobs.length) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No jobs scheduled for this department.
        </Typography>
      </Box>
    );
  }

  const visibleJobs = filterMachineId ? jobs.filter(j => j.machineId === filterMachineId) : jobs;

  return (
    <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', pr: 0.5 }}>
      <List dense disablePadding>
        {visibleJobs.map((job, index) => (
          <ListItem
            key={job.id}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              px: 1,
              py: 0.75,
              bgcolor: getJobColor(job.jobId, index).bg,
              color: getJobColor(job.jobId, index).fg,
              border: '1px solid',
              borderColor: getJobColor(job.jobId, index).border,
              cursor: onJobClick ? 'pointer' : 'default',
            }}
            onClick={() => onJobClick && onJobClick(job)}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: getJobColor(job.jobId, index).meta, fontWeight: 500 }}
                  >
                    {job.jobId}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {job.name}
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="caption" sx={{ color: getJobColor(job.jobId, index).meta }}>
                    Machine {job.machineId} • {job.employeeName}
                  </Typography>
                  <Box>
                    <Chip
                      size="small"
                      label={job.status}
                      color={getStatusColor(job.status)}
                      variant={job.status === 'pending' ? 'outlined' : 'filled'}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'in-progress':
      return 'success';
    case 'completed':
      return 'default';
    case 'pending':
    default:
      return 'warning';
    case 'cancelled':
      return 'error';
  }
}

// Stable color mapping for jobs based on jobId hash
const palette = [
  { bg: '#ecfdf5', border: '#34d399', fg: '#065f46', meta: '#047857' }, // green
  { bg: '#f0f9ff', border: '#38bdf8', fg: '#0c4a6e', meta: '#0369a1' }, // sky
  { bg: '#f5f3ff', border: '#a78bfa', fg: '#4c1d95', meta: '#6d28d9' }, // violet
  { bg: '#fff7ed', border: '#fb923c', fg: '#7c2d12', meta: '#c2410c' }, // orange
  { bg: '#fdf2f8', border: '#f472b6', fg: '#831843', meta: '#be185d' }, // pink
  { bg: '#f0fdfa', border: '#2dd4bf', fg: '#134e4a', meta: '#0d9488' }, // teal
  { bg: '#fefce8', border: '#facc15', fg: '#713f12', meta: '#ca8a04' }, // yellow
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0; // to 32bit int
  }
  return Math.abs(h);
}

function getJobColor(jobId, index) {
  const hash = hashString(jobId + index);
  return palette[hash % palette.length];
}

export default JobList;

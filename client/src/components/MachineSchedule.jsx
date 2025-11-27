// src/components/MachineSchedule.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

/* eslint-disable react/prop-types */
function MachineSchedule({
  machines,
  jobs,
  timeSlots,
  onJobClick,
  onEmptyCellClick,
  selectedMachineId,
  onSelectMachine,
}) {
  const cellData = buildCellData(machines, jobs, timeSlots);

  if (!machines.length) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Select a department with machines to view its schedule.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      sx={{
        maxHeight: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Table
        stickyHeader
        size="small"
        sx={{
          '& th, & td': {
            whiteSpace: 'nowrap',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                position: 'sticky',
                left: 0,
                zIndex: 3,
                bgcolor: 'background.paper',
                minWidth: 180,
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Machine / Time
              </Typography>
            </TableCell>
            {timeSlots.map((slot) => (
              <TableCell
                key={slot}
                align="center"
                sx={{
                  minWidth: 80,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {slot}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.map((machine) => {
            const rowCells = cellData[machine.id] || [];

            return (
              <TableRow key={machine.id} hover={false} sx={{ bgcolor: selectedMachineId === machine.id ? 'action.selected' : undefined }}>
                <TableCell
                  sx={{
                    position: 'sticky',
                    left: 0,
                    zIndex: 2,
                    bgcolor: 'background.paper',
                    borderRight: '1px solid',
                    borderRightColor: 'divider',
                    cursor: 'pointer',
                  }}
                  onClick={() => onSelectMachine && onSelectMachine(machine.id)}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {machine.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {machine.id}
                  </Typography>
                </TableCell>

                {timeSlots.map((_, slotIndex) => {
                  const cell = rowCells[slotIndex];

                  if (cell && cell.job) {
                    const { job, isStartOfJob } = cell;
                    const colors = getJobColor(job.jobId);
                    return (
                      <Tooltip
                        key={slotIndex}
                        title={
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {job.jobId} – {job.name}
                            </Typography>
                            <Typography variant="caption">
                              Employee: {job.employeeName}
                            </Typography>
                          </Box>
                        }
                        arrow
                        followCursor
                      >
                        <TableCell
                          onClick={() => onJobClick(job)}
                          sx={{
                            cursor: 'pointer',
                            bgcolor: colors.bg,
                            borderLeft: '1px solid',
                            borderLeftColor: colors.border,
                            borderRight: '1px solid',
                            borderRightColor: colors.border,
                            px: 0.5,
                          }}
                        >
                          {isStartOfJob && (
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{ fontWeight: 600, display: 'block', color: colors.fg }}
                              >
                                {job.jobId}
                              </Typography>
                              <Typography variant="caption" noWrap sx={{ color: colors.fg }}>
                                {job.name}
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                      </Tooltip>
                    );
                  }

                  return (
                    <TableCell
                      key={slotIndex}
                      onClick={() => {
                        if (onSelectMachine) onSelectMachine(machine.id);
                        onEmptyCellClick(machine, slotIndex);
                      }}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: '#ffffff',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    />
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function buildCellData(machines, jobs, timeSlots) {
  const result = {};

  machines.forEach((machine) => {
    result[machine.id] = new Array(timeSlots.length).fill(null);
  });

  jobs.forEach((job) => {
    if (!result[job.machineId]) return;

    const start = job.startSlot;
    const end = Math.min(timeSlots.length, job.startSlot + job.durationSlots);

    for (let i = start; i < end; i += 1) {
      result[job.machineId][i] = {
        job,
        isStartOfJob: i === start,
      };
    }
  });

  return result;
}

export default MachineSchedule;

// Color mapping reused for schedule cells
const schedulePalette = [
  { bg: '#ecfdf5', border: '#6ee7b7', fg: '#065f46' },
  { bg: '#f0f9ff', border: '#7dd3fc', fg: '#0c4a6e' },
  { bg: '#f5f3ff', border: '#c4b5fd', fg: '#4c1d95' },
  { bg: '#fff7ed', border: '#fdba74', fg: '#7c2d12' },
  { bg: '#fdf2f8', border: '#f9a8d4', fg: '#831843' },
  { bg: '#f0fdfa', border: '#99f6e4', fg: '#134e4a' },
  { bg: '#fefce8', border: '#fde68a', fg: '#713f12' },
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getJobColor(jobId) {
  const hash = hashString(jobId);
  return schedulePalette[hash % schedulePalette.length];
}

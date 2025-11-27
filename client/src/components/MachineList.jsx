// src/components/MachineList.jsx
import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';

/* eslint-disable react/prop-types */
function MachineList({ machines, selectedMachineId, onSelectMachine }) {
  if (!machines.length) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No machines defined for this department.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', pr: 0.5 }}>
      <List dense disablePadding>
        {/* Pseudo item: All m/c jobs */}
        <ListItem
          key="ALL"
          onClick={() => onSelectMachine && onSelectMachine(null)}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            px: 1,
            py: 0.6,
            bgcolor: selectedMachineId == null ? 'action.selected' : 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            cursor: 'pointer',
          }}
        >
          <ListItemIcon sx={{ minWidth: 28 }}>
            <CircleIcon sx={{ fontSize: 10, color: 'primary.main' }} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>All m/c jobs</Typography>}
          />
        </ListItem>
        {machines.map((machine) => (
          <ListItem
            key={machine.id}
            onClick={() => onSelectMachine && onSelectMachine(machine.id)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              px: 1,
              py: 0.6,
              bgcolor: selectedMachineId === machine.id ? 'action.selected' : 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              cursor: 'pointer',
            }}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CircleIcon sx={{ fontSize: 10, color: 'success.main' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {machine.name}
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {machine.id}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default MachineList;

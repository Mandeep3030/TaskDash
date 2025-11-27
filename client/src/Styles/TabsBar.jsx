// src/Styles/TabsBar.jsx
import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DepartmentTabs from '../components/DepartmentTabs';

function TabsBar({ departments, selected, onSelect }) {
  return (
    <Paper
      square
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', px: 2, py: 1 }}
    >
      <Box sx={{ maxWidth: 1500, mx: 'auto', width: '100%' }}>
        <DepartmentTabs
          departments={departments}
          selected={selected}
          onSelect={onSelect}
        />
      </Box>
    </Paper>
  );
}

export default TabsBar;

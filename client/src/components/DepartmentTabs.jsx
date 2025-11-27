// src/components/DepartmentTabs.jsx
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

/* eslint-disable react/prop-types */
function DepartmentTabs({ departments, selected, onSelect }) {
  const value = departments.indexOf(selected);

  const handleChange = (event, newValue) => {
    const dept = departments[newValue];
    const isEnabled = dept === 'Printing';
    if (isEnabled) {
      onSelect(dept);
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
      >
        {departments.map((dept, index) => {
          const isEnabled = dept === 'Printing';
          return (
            <Tab
              key={dept}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box component="span" sx={{ fontSize: '1rem' }}>{dept}</Box>
                  {!isEnabled && (
                    <Chip
                      label="Coming soon"
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  )}
                </Box>
              }
              value={index}
              disabled={!isEnabled}
              sx={{
                textTransform: 'none',
                minHeight: 40,
                py: 0.75,
                fontSize: '1rem',
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

export default DepartmentTabs;

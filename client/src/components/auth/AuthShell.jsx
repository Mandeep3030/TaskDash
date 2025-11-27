// src/components/auth/AuthShell.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FloatingShapes from './FloatingShapes';

/* eslint-disable react/prop-types */
function AuthShell({
  title,
  subtitle,
  toggleText,
  toggleActionLabel,
  toggleTo,
  children,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: { xs: 2, md: 3 },
      }}
    >
      <FloatingShapes />

      <Paper
        elevation={8}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 960,
          borderRadius: 3,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 1fr' },
          bgcolor: 'background.paper',
        }}
      >
        {/* Left visual / branding panel */}
        <Box
          sx={{
            position: 'relative',
            color: 'common.white',
            minHeight: { xs: 220, md: 'auto' },
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // Use local image from /public with a subtle overlay
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(/auth-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'grey.800',
          }}
        >
          {/* Top branding bar */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              TaskDash Scheduler
            </Typography>
          </Box>

          {/* Text + small bars */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Plan every shift,
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              keep every job on track.
            </Typography>
            <Typography
              variant="caption"
              sx={{ maxWidth: 280, opacity: 0.9, mb: 2 }}
            >
              Visualize machines, assignments and job timing for each section in
              your shop floor.
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 32,
                  height: 4,
                  borderRadius: 999,
                  bgcolor: 'secondary.main',
                }}
              />
              <Box
                sx={{
                  width: 24,
                  height: 4,
                  borderRadius: 999,
                  bgcolor: 'grey.700',
                }}
              />
              <Box
                sx={{
                  width: 20,
                  height: 4,
                  borderRadius: 999,
                  bgcolor: 'grey.600',
                }}
              />
            </Stack>
          </Box>
        </Box>

        {/* Right form panel */}
        <Box sx={{
          p: { xs: 3, md: 4 },
          maxHeight: { xs: 'auto', md: 'calc(100vh - 140px)' },
          overflowY: 'auto',
        }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1 }}
              >
                {subtitle}
              </Typography>
            )}
            {toggleText && (
              <Typography variant="caption">
                {toggleText}{' '}
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  onClick={() => navigate(toggleTo)}
                >
                  {toggleActionLabel}
                </Button>
              </Typography>
            )}
          </Box>

          {children}
        </Box>
      </Paper>
    </Box>
  );
}

export default AuthShell;

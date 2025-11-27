// src/components/auth/FloatingShapes.jsx
import React from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

const float1 = keyframes`
  0%   { transform: translate3d(-10px, 0, 0) scale(1);   opacity: 0.18; }
  50%  { transform: translate3d(10px, -20px, 0) scale(1.05); opacity: 0.3; }
  100% { transform: translate3d(30px, 10px, 0) scale(1.1); opacity: 0.18; }
`;

const float2 = keyframes`
  0%   { transform: translate3d(0, 10px, 0) scale(1);   opacity: 0.16; }
  50%  { transform: translate3d(-20px, -10px, 0) scale(1.1); opacity: 0.28; }
  100% { transform: translate3d(-10px, 20px, 0) scale(1.05); opacity: 0.16; }
`;

const float3 = keyframes`
  0%   { transform: translate3d(10px, -10px, 0) rotate(0deg);   opacity: 0.12; }
  50%  { transform: translate3d(-10px, 10px, 0) rotate(8deg);   opacity: 0.2; }
  100% { transform: translate3d(10px, 20px, 0) rotate(-6deg);   opacity: 0.12; }
`;

function FloatingShapes() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Soft circle left */}
      <Box
        sx={{
          position: 'absolute',
          width: 260,
          height: 260,
          borderRadius: '50%',
          bgcolor: 'primary.light',
          opacity: 0.18,
          filter: 'blur(1px)',
          top: '8%',
          left: '-6%',
          animation: `${float1} 22s ease-in-out infinite alternate`,
        }}
      />
      {/* Soft circle right */}
      <Box
        sx={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          bgcolor: 'secondary.light',
          opacity: 0.18,
          filter: 'blur(1px)',
          bottom: '4%',
          right: '-4%',
          animation: `${float2} 24s ease-in-out infinite alternate`,
        }}
      />
      {/* Rounded square middle */}
      <Box
        sx={{
          position: 'absolute',
          width: 160,
          height: 160,
          borderRadius: 6,
          bgcolor: 'info.light',
          opacity: 0.12,
          top: '40%',
          right: '20%',
          animation: `${float3} 26s ease-in-out infinite alternate`,
        }}
      />
    </Box>
  );
}

export default FloatingShapes;

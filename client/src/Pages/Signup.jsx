// src/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthShell from '../components/auth/AuthShell';
import { signUp } from '../api/index.js';

function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  // Display roles map to backend roles
  const [role, setRole] = useState('employee'); // default to 'user' label

  const validate = () => {
    const nextErrors = {};

    if (!firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!lastName.trim()) nextErrors.lastName = 'Last name is required';

    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (!agree) {
      nextErrors.agree = 'You must agree to the terms';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const name = `${firstName.trim()} ${lastName.trim()}`.trim();
      await signUp({ name, email: email.trim(), password, role });
      // After successful signup, go to sign in
      navigate('/signin');
    } catch (err) {
      setErrors({ email: err.message || 'Failed to sign up' });
    }
  };

  return (
    <AuthShell
      title="Create an account"
      subtitle="Set up your profile to start managing jobs and machines."
      toggleText="Already have an account?"
      toggleActionLabel="Sign in"
      toggleTo="/signin"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <TextField
            label="First name"
            placeholder="Alex"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          <TextField
            label="Last name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
        </Box>

        <TextField
          type="email"
          label="Email"
          placeholder="name@example.com"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <FormControl fullWidth>
          <InputLabel id="role-label">Role</InputLabel>
          <Select labelId="role-label" id="role-select" value={role} label="Role" onChange={(e) => setRole(e.target.value)}>
            <MenuItem value={'admin'}>admin</MenuItem>
            <MenuItem value={'user'}>user</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Create a password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((s) => !s)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Button size="small" variant="text">
                Terms &amp; Conditions
              </Button>
            </Typography>
          }
        />
        {errors.agree && (
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: -1, mb: 1 }}
          >
            {errors.agree}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="secondary" sx={{ py: 1.2, fontWeight: 600, mt: 1 }}>
          Create account
        </Button>

        {/* Social sign-up options removed */}
      </Box>
    </AuthShell>
  );
}

export default SignUp;

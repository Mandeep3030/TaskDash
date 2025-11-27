// src/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
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
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!lastName.trim()) nextErrors.lastName = 'Last name is required';

    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email';
    }

    if (!employeeId.trim()) {
      nextErrors.employeeId = 'Employee ID is required';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please repeat your password';
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match';
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
      await signUp({ name, email: email.trim(), password, employeeId: employeeId.trim() });
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'grid', gap: 2 }}
      >
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

        <TextField
          label="Employee ID"
          placeholder="e.g. emp123"
          fullWidth
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          error={Boolean(errors.employeeId)}
          helperText={errors.employeeId}
        />

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

        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Confirm password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
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

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ py: 1.2, fontWeight: 600, mt: 1 }}
        >
          Create account
        </Button>

        <Divider sx={{ my: 2 }} />
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
        >
          Or continue with
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={
              <img
                src="https://www.google.com/favicon.ico"
                alt=""
                width={16}
                height={16}
              />
            }
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={
              <img
                src="https://developer.apple.com/favicon.ico"
                alt=""
                width={16}
                height={16}
              />
            }
          >
            Apple
          </Button>
        </Box>
      </Box>
    </AuthShell>
  );
}

export default SignUp;

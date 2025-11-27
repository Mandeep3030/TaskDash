// Simple API client using fetch, with JWT storage
const API_BASE = import.meta?.env?.VITE_API_URL || 'http://localhost:4000';

const TOKEN_KEY = 'td_token';
const USER_KEY = 'td_user';

export function saveSession({ token, user }) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function apiFetch(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const message = data?.error || (typeof data === 'string' ? data : 'Request failed');
    throw new Error(message);
  }
  return data;
}

// Auth endpoints
export async function signIn({ email, password }) {
  const data = await apiFetch('/auth/signin', {
    method: 'POST',
    body: { email, password },
  });
  saveSession(data);
  return data;
}

export async function signUp({ name, email, password, employeeId }) {
  // POST body must match backend model
  return apiFetch('/auth/signup', {
    method: 'POST',
    body: { name, email, password, employeeId },
  });
}

export async function signOut() {
  try { await apiFetch('/auth/signout', { method: 'GET', auth: true }); } catch {}
  clearSession();
}

// Jobs
export async function getJobs() {
  return apiFetch('/api/jobs', { auth: true });
}

export async function createJob(job) {
  return apiFetch('/api/jobs', { method: 'POST', body: job, auth: true });
}

export async function updateJob(id, patch) {
  return apiFetch(`/api/jobs/${id}`, { method: 'PUT', body: patch, auth: true });
}

// Employees
export async function getEmployees() {
  return apiFetch('/api/employees', { auth: true });
}

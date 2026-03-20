export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
  },
  tasks: `${API_BASE_URL}/tasks`,
} as const;

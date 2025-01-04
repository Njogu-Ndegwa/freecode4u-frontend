// services/authService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Fetch the base URL from .env

interface LoginResponse {
  access: string;
  refresh: string;
  detail?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('An error occurred during login');
  }
};
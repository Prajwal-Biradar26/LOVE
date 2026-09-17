/**
 * API Configuration Utility
 * Resolves the backend base URL for local development and production deployments.
 */

// In development, empty string uses Vite proxy (/api -> http://localhost:5000)
// In production, VITE_API_URL can point to your deployed backend (e.g., https://your-backend.onrender.com)
const envUrl = import.meta.env.VITE_API_URL;
export const API_BASE_URL = envUrl ? envUrl.replace(/\/$/, '') : '';

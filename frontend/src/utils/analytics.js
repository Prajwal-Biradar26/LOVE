import { API_BASE_URL } from './api.js';

/**
 * Anonymous Interaction Logger
 * Safely posts interaction events to the backend without throwing client errors.
 */

export const logInteraction = async (event, details = {}) => {
  try {
    const payload = {
      event,
      timestamp: new Date().toISOString(),
      details,
    };

    await fetch(`${API_BASE_URL}/api/apology/interaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Gracefully fail silently so the romantic UI flow is never disrupted
    console.debug('Interaction log offline/queued:', event);
  }
};

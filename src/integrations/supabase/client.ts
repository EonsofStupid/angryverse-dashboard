import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vkcimdnqmrjfiauusibe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2ltZG5xbXJqZmlhdXVzaWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDY0MjAsImV4cCI6MjA1MTU4MjQyMH0.lFETjiNllJYeyX-wXCvJN0T0VcFqjpLbiLYSHAJR00w";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: {
      getItem: (key) => {
        const value = localStorage.getItem(key);
        // Intercept auth requests to add captcha token
        if (key.includes('auth-token')) {
          const captchaToken = localStorage.getItem('captcha_token');
          if (captchaToken) {
            // Remove the token after using it
            localStorage.removeItem('captcha_token');
            // Add the token to the auth headers
            return JSON.stringify({
              ...JSON.parse(value || '{}'),
              captcha_token: captchaToken
            });
          }
        }
        return value;
      },
      setItem: (key, value) => localStorage.setItem(key, value),
      removeItem: (key) => localStorage.removeItem(key)
    }
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
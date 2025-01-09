import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vkcimdnqmrjfiauusibe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2ltZG5xbXJqZmlhdXVzaWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDY0MjAsImV4cCI6MjA1MTU4MjQyMH0.lFETjiNllJYeyX-wXCvJN0T0VcFqjpLbiLYSHAJR00w";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
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
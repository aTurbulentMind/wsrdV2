import { createClient } from '@supabase/supabase-js';

const PUBLIC_SUPABASE_URL = 'https://vyzeudiywhlxdzpnfehs.supabase.co';
const PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5emV1ZGl5d2hseGR6cG5mZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwOTI0NjQsImV4cCI6MjA0MTY2ODQ2NH0.a4mNwSC0P1XlA4Cz5uHUEWPLeQWY7t7B66mZ4W-HSH8';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

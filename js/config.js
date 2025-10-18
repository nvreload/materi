// js/config.js
// Ganti dengan URL dan Key Supabase Anda
const SUPABASE_URL = 'https://zrarmqhrrpgxjcpvymbi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyYXJtcWhycnBneGpjcHZ5bWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3ODc1MzgsImV4cCI6MjA3NjM2MzUzOH0.8u4_619sxEWiLAScNN6BOS6mVfClPQXFsxS1RhqkfPU';

// Inisialisasi Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wscvfkjtvweztzoxjhyq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzY3Zma2p0dndlenR6b3hqaHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NDg4OTMsImV4cCI6MjA4ODAyNDg5M30.msDRcZ5l3CsxgPmkNIoeiR9s2ADMlPQIhjyRDKvey5U'

export const supabase = createClient(supabaseUrl, supabaseKey)
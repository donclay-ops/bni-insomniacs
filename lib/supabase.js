import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jfhfcluofljzijgesszf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaGZjbHVvZmxqemlqZ2Vzc3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDE2NzcsImV4cCI6MjA5MTMxNzY3N30.I4zzKjv4QwME2D09OokXbJRYnz9eDL6QEa8fF1FT3f4'

export const supabase = createClient(supabaseUrl, supabaseKey)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqoryxludaqglyonsxyp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impxb3J5eGx1ZGFxZ2x5b25zeHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDE0NzYsImV4cCI6MjA1OTExNzQ3Nn0.69a-CLRKlGc5pvtivEQ2Aal6x4JSBjFqMKPbW5M3hPY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})

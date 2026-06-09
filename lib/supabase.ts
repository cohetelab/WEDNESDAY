import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://myurtqvesgfrawryczuh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dXJ0cXZlc2dmcmF3cnljenVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NzQyNzksImV4cCI6MjA5MDM1MDI3OX0.W5QBjjZ8HpnQL5mmtSNdVwLwIYKPapPr3kTNG1wCgYU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type Creator = {
  id: string
  name: string
  handle: string
  platform: string
  category: string
  followers: string
  engagement: string
  country: string
  status: string
  created_at: string
}

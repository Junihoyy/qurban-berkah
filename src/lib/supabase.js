import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://boksdzmhfuuuyseooyfs.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_649HcXEUNsjHQHrp1UJx8w_9041m47c'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

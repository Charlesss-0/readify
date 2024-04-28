import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	'https://ysctpxsajgpvxplthplf.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzY3RweHNhamdwdnhwbHRocGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1MjA4OTIsImV4cCI6MjAyODA5Njg5Mn0.-aEdDV22YqThC5v3HlmIuV1OplyTjGJW9MfAG2hFha0'
)
export default supabase

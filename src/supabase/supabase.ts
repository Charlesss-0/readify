import { SupabaseClient, createClient } from '@supabase/supabase-js'

function init(): SupabaseClient {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

	if (!supabaseUrl || !supabaseKey) {
		throw new Error('Supabase URL or key not provided')
	}

	return createClient(supabaseUrl, supabaseKey)
}

const supabase = init()

export default supabase

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
// Note: These env vars should be in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST() {
    if (!supabaseUrl || !supabaseKey) {
        console.error("❌ MISSING SUPABASE KEYS: Check .env.local for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
        return NextResponse.json(
            { error: 'Missing Supabase credentials' },
            { status: 500 }
        );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // 1. Get current count
        const { data: current, error: fetchError } = await supabase
            .from('site_stats')
            .select('visits')
            .eq('id', 1)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            // Real error, not just "not found"
            console.error('Error fetching visits:', fetchError);
            return NextResponse.json({ visits: 0 }, { status: 500 });
        }

        let newCount = 1;

        if (!current) {
            // Row doesn't exist, create it
            const { error: insertError } = await supabase
                .from('site_stats')
                .insert([{ id: 1, visits: 1 }]);

            if (insertError) {
                console.error('Error creating stats row:', insertError);
                return NextResponse.json({ error: 'Failed to init stats' }, { status: 500 });
            }
        } else {
            // Row exists, increment
            newCount = current.visits + 1;
            const { error: updateError } = await supabase
                .from('site_stats')
                .update({ visits: newCount })
                .eq('id', 1);

            if (updateError) {
                console.error('Error updating visits:', updateError);
                return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
            }
        }

        return NextResponse.json({ visits: newCount });
    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ visits: 0 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data } = await supabase
        .from('site_stats')
        .select('visits')
        .eq('id', 1)
        .single();

    return NextResponse.json({ visits: data?.visits ?? 0 });
}

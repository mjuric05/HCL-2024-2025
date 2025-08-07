import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();
        
        const { data: cars, error } = await supabase
            .from('cars')
            .select('*')
            .eq('available', true)
            .order('title', { ascending: true });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: "Failed to fetch car data" }, { status: 500 });
        }

        return NextResponse.json(cars || []);
    } catch (error) {
        console.error("Error fetching car data:", error);
        return NextResponse.json({ error: "Failed to fetch car data" }, { status: 500 });
    }
}
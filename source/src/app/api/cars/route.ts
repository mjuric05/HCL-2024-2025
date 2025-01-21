import { getStaticProps } from "@/dbConnector";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await getStaticProps();
        return NextResponse.json(result.props.cars);
    } catch (error) {
        console.error("Error fetching car data:", error);
        return NextResponse.json({ error: "Failed to fetch car data" }, { status: 500 });
    }
}
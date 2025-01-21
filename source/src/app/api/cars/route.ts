import { getStaticProps } from "@/dbConnector"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const result = await getStaticProps()
        const cars = result.props.cars.map((entry: any) => ({
            fields: {
                title: String(entry.fields.title),
                description: entry.fields.description,
                price: Number(entry.fields.price),
                thumbnail: entry.fields.thumbnail,
                size: String(entry.fields.size),
            },
        }))
        return NextResponse.json(cars)
    } catch (error) {
        console.error("Error fetching car data:", error)
        return NextResponse.json({ error: "Failed to fetch car data" }, { status: 500 })
    }
}


import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "london";

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch weather data",
      },
      { status: 500 }
    );
  }
}

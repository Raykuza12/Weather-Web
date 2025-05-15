import { WeatherData, CityData } from "../types/weather";

const API_KEY = "e99972ad202fbf3e8491e085b1564510";

export async function getWeatherData(city = "london"): Promise<WeatherData> {
  try {
    const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      city: { name: "Error" },
      list: [
        {
          main: {
            temp: "--",
            humidity: "--",
          },
          weather: [{ description: "Unable to fetch weather data", icon: "" }],
          wind: { speed: "--" },
        },
      ],
    } as unknown as WeatherData;
  }
}

export async function getCitySuggestions(query: string): Promise<string[]> {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch city suggestions");
    }

    const data = await res.json();
    return data.map((city: CityData) => `${city.name}, ${city.country}`);
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
}

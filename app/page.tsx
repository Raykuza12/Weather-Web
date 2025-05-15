"use client";
import { useState, useEffect } from "react";

import { WeatherData } from "./types/weather";
import { getWeatherData } from "./services/weatherService";
import { getWeatherBackground } from "./utils/weatherUtils";
import SearchBar from "./component/SearchBar";
import WeatherDisplay from "./component/WeatherDisplay";

export default function Page() {
  const [city, setCity] = useState("london");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData(city);
      setWeather(data);
    };
    fetchData();
  }, [city]);

  const handleSearch = async (searchCity: string) => {
    setCity(searchCity);
  };

  if (!weather) return <div>Loading...</div>;

  const currentWeather = weather.list[0];

  return (
    <main
      className={`w-screen min-h-screen bg-gradient-to-br ${getWeatherBackground(
        currentWeather.weather[0].icon
      )} flex items-center justify-center relative overflow-hidden py-4 sm:py-6 lg:py-8`}
    >
      <div className="backdrop-blur-md bg-white/30 rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 w-full max-w-md mx-4 sm:mx-6 lg:mx-8 transition-all hover:shadow-2xl relative z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-black mb-2 sm:mb-4 md:mb-6 text-center">
          WeatherCast
        </h1>
        <div className="flex flex-col gap-2 sm:gap-4 md:gap-6">
          <SearchBar onSearch={handleSearch} />
          <WeatherDisplay
            cityName={weather.city.name}
            currentWeather={currentWeather}
          />
        </div>
      </div>
    </main>
  );
}

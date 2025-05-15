import { WeatherItem } from "../types/weather";
import { kelvinToCelsius, msToKmh } from "../utils/weatherUtils";

interface WeatherDisplayProps {
  cityName: string;
  currentWeather: WeatherItem;
}

export default function WeatherDisplay({
  cityName,
  currentWeather,
}: WeatherDisplayProps) {
  const tempInCelsius = kelvinToCelsius(currentWeather.main.temp);

  return (
    <>
      <div className="text-center p-3 sm:p-4 md:p-6 backdrop-blur-md bg-transparent rounded-xl sm:rounded-2xl shadow-inner">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          {cityName}
        </h2>
        <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-black my-2 sm:my-4 md:my-6 lg:my-8">
          {tempInCelsius}°C
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 capitalize">
          {currentWeather.weather[0].description}
        </p>
        <div className="my-2 sm:my-4 md:my-6 transform hover:scale-110 transition-transform">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            alt="weather icon"
            width="120"
            height="120"
            className="mx-auto w-16 sm:w-24 md:w-32"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <div className="backdrop-blur-md bg-transparent p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-inner hover:bg-white/40 transition-all">
          <p className="text-xs sm:text-sm text-gray-600">Humidity</p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
            {currentWeather.main.humidity}%
          </p>
        </div>
        <div className="backdrop-blur-md bg-transparent p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-inner hover:bg-white/40 transition-all">
          <p className="text-xs sm:text-sm text-gray-600">Wind Speed</p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
            {msToKmh(currentWeather.wind.speed)} km/h
          </p>
        </div>
      </div>
    </>
  );
}

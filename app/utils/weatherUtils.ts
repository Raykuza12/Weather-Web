export function kelvinToCelsius(kelvin: number | string): string {
  if (typeof kelvin === "string") return kelvin;
  return (kelvin - 273.15).toFixed(1);
}

export function getWeatherBackground(weatherCode: string): string {
  switch (weatherCode.slice(0, -1)) {
    case "01": // clear sky
      return "from-blue-400 to-yellow-300";
    case "02": // few clouds
    case "03": // scattered clouds
    case "04": // broken clouds
      return "from-gray-300 to-blue-200";
    case "09": // shower rain
    case "10": // rain
      return "from-gray-600 to-blue-700";
    case "11": // thunderstorm
      return "from-gray-800 to-purple-900";
    case "13": // snow
      return "from-blue-100 to-gray-100";
    case "50": // mist
      return "from-gray-400 to-gray-300";
    default:
      return "from-blue-50 to-purple-50";
  }
}

export function msToKmh(speedInMs: number | string): string {
  if (typeof speedInMs === "string") return speedInMs;
  return (speedInMs * 3.6).toFixed(1);
}

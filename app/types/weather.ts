export interface WeatherData {
  city: {
    name: string;
  };
  list: WeatherItem[];
}

export interface WeatherItem {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export interface CityData {
  name: string;
  country: string;
}

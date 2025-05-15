import { CloudIcon } from "@heroicons/react/16/solid";

export default function Header() {
  return (
    <div className="p-6 bg-white/20 backdrop-blur-sm shadow-lg w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-black">
            WeatherCast
          </h1>
          <CloudIcon className="h-8 w-8 ml-2 text-black animate-none" />
        </div>
      </div>
    </div>
  );
}

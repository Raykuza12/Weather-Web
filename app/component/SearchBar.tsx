import { useState } from "react";
import { getCitySuggestions } from "../services/weatherService";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("london");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    setShowSuggestions(false);
    onSearch(searchInput);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.length > 2) {
      const cityOptions = await getCitySuggestions(value);
      setSuggestions(cityOptions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const cityName = suggestion.split(",")[0];
    setSearchInput(cityName);
    setShowSuggestions(false);
    onSearch(cityName);
  };

  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <input
          type="text"
          placeholder="Enter city name"
          className="border-2 border-black p-2 sm:p-3 rounded-lg sm:rounded-xl w-full focus:outline-none focus:border-gray-500 transition-all text-sm sm:text-base text-black"
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="transition-all bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg w-full sm:w-auto text-sm sm:text-base hover:opacity-90 hover:bg-gray-500"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg sm:rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 sm:p-3 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// pages/HomePage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const suggestions = ["Therapist", "Mentor", "IT Support", "Designer", "Trainer"];

function HomePage() {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setQuery(value);
    setFilteredSuggestions(
      suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleSelect = (service) => {
    navigate("/services", { state: { service } });
  };

  return (
    <div id="home" className="section flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Quick Book</h1>
      <input
        type="text"
        className="p-2 border rounded w-80"
        placeholder="Search for a name, service Ex: Therapist, John..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {query && (
        <ul className="bg-white border w-80 mt-2 shadow-lg">
          {filteredSuggestions.map((s) => (
            <li
              key={s}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;


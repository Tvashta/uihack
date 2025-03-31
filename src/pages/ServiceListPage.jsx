import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const professionals = [
  { id: 1, name: "Dr. Smith", rating: 4.9, tagline: "Expert Therapist", tags: ["Mental Health", "ADHD"], image: "/images/avatar.jpg" },
  { id: 2, name: "John Doe", rating: 4.5, tagline: "Business Mentor", tags: ["Startup", "Finance"], image: "/images/avatar.jpg" },
  { id: 3, name: "Jane Wilson", rating: 4.7, tagline: "IT Support Specialist", tags: ["Tech", "Networking"], image: "/images/avatar.jpg" }
];

function ServiceListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceType = location.state?.service || "All Services";
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfessionals = professionals.filter((prof) => 
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    prof.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="section" id="services">
      <h2 className="text-2xl font-bold mb-4">{serviceType}</h2>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or tag"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredProfessionals.map((prof) => (
          <div
            key={prof.id}
            className="card bg-white p-6 rounded-lg shadow-lg cursor-pointer flex flex-col items-center text-center transition-transform transform hover:scale-105"
            onClick={() => navigate(`/service/${prof.id}`)}
          >
            <img src={prof.image} alt={prof.name} className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900">{prof.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{prof.tagline}</p>
            <p className="star text-yellow-500 font-bold">⭐ {prof.rating}</p>
            <div className="tags mt-3 flex flex-wrap justify-center gap-2">
              {prof.tags.map((tag) => (
                <span key={tag} className="tag bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceListPage;

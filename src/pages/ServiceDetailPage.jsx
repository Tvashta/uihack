import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Sample data for professionals
const professionals = {
  1: { name: "Dr. Smith", rating: 4.9, description: "Experienced therapist helping clients with mental health.", tags: ["Mental Health", "ADHD"], availableSlots: ["10:00 AM", "2:00 PM"] },
  2: { name: "John Doe", rating: 4.5, description: "Expert business mentor guiding startups.", tags: ["Startup", "Finance"], availableSlots: ["1:00 PM", "3:30 PM"] },
  3: { name: "Jane Wilson", rating: 4.7, description: "IT support specialist for networking issues.", tags: ["Tech", "Networking"], availableSlots: ["11:00 AM", "4:00 PM"] }
};

function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const professional = professionals[id];

  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());  // Start with current month
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!professional) return <p>Service provider not found.</p>;

  // Get current month's calendar dates
  const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();
  
  // Generate random availability data (0 to 1)
  const generateAvailability = () => {
    const availability = {};
    for (let day = 1; day <= daysInMonth; day++) {
      availability[day] = Math.random(); // Random availability between 0 (not available) and 1 (fully available)
    }
    return availability;
  };

  const availability = generateAvailability();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSlotClick = (slot) => {
    const fullDate = new Date(new Date().getFullYear(), month, selectedDate);
    const fullDateTime = `${fullDate.toLocaleDateString()} ${slot}`;
    navigate("/booking", { state: { professional, dateTime: fullDateTime } });
    setIsModalOpen(false);
  };

  // Get background color based on availability value
  const getAvailabilityColor = (availabilityLevel, isPastDate) => {
    if (isPastDate) return 'black'; // Black for past dates
    const intensity = Math.floor(255 - (availabilityLevel * 255)); // 0 (black) to 255 (green)
    return `rgb(0, ${intensity}, 0)`; // Varying green intensity
  };

  // Function to get the earliest available slot with more than 50% availability
  const getSuggestedSlots = () => {
    const upcomingDays = Object.keys(availability)
      .filter((day) => availability[day] > 0.5 && new Date(new Date().getFullYear(), month, day) >= new Date())
      .sort((a, b) => a - b);
    
    if (upcomingDays.length > 0) {
      const earliestDay = upcomingDays[0];
      return professional.availableSlots.map((slot) => {
        const date = new Date(new Date().getFullYear(), month, earliestDay);
        const fullDate = `${date.toLocaleDateString()} ${slot}`;
        return fullDate;
      });
    }
    return [];
  };

  return (
    <div className="service-detail-page">
      <div className="service-detail-container">
        {/* Left Panel (Service Description and Info) */}
        <div className="service-info">
          <div className="service-card">
            <h2 className="text-2xl font-bold">{professional.name}</h2>
            <p className="text-yellow-500">⭐ {professional.rating}</p>
            <p className="mt-2">{professional.description}</p>
            <div className="tags mt-3">
              {professional.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="available-slots mt-4">
              <h3 className="font-semibold">Suggested Slots:</h3>
              <div className="flex gap-2 mt-2">
                {getSuggestedSlots().map((slot) => (
                  <button
                    key={slot}
                    className="slot-button"
                    onClick={() => navigate("/booking", { state: { professional, slot } })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (Calendar) */}
        <div className="calendar-panel">
          <div className="calendar-header">
            <button onClick={() => setMonth((prev) => (prev === 0 ? 11 : prev - 1))}>{"<"}</button>
            <span className="calendar-month">{new Date(new Date().getFullYear(), month).toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</span>
            <button onClick={() => setMonth((prev) => (prev === 11 ? 0 : prev + 1))}>{">"}</button>
          </div>

          <div className="calendar-grid">
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const isPastDate = new Date(new Date().getFullYear(), month, day) < new Date();
              const availabilityLevel = availability[day];
              const availabilityColor = getAvailabilityColor(availabilityLevel, isPastDate);
              return (
                <div
                  key={day}
                  className="calendar-day"
                  style={{ backgroundColor: availabilityColor }}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Color Scale Below Calendar */}
          <div className="availability-scale">
            <span className="scale-label">Not Available</span>
            <div className="scale-bar"></div>
            <span className="scale-label">Fully Available</span>
          </div>
        </div>
      </div>

      {/* Modal for Selecting Slot */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Available Slots for {new Date(new Date().getFullYear(), month, selectedDate).toLocaleDateString()}</h3>
            {professional.availableSlots.map((slot) => (
              <button
                key={slot}
                className="slot-button"
                onClick={() => handleSlotClick(slot)}
              >
                {slot}
              </button>
            ))}
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceDetailPage;

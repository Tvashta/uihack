// pages/BookingConfirmationPage.js
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { professional, slot } = location.state;
  const [email, setEmail] = useState("");

  const handleConfirm = () => {
    navigate("/success", { state: { professional, slot, email } });
  };

  return (
    <div className="p-6 confirmation">
      <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
      <p className="mb-2">You are booking {professional.name} at {slot}</p>
      <input
        type="email"
        className="p-2 border rounded w-80"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleConfirm} className="mt-4 bg-green-500 text-white p-2 rounded">Confirm</button>
    </div>
  );
}

export default BookingConfirmationPage;
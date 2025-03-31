
// pages/SuccessPage.js
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { professional, slot, email } = location.state;

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
      <p className="mt-2">You have successfully booked {professional.name} at {slot}.</p>
      <p>A confirmation email has been sent to {email}.</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default SuccessPage;
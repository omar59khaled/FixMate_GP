import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Alert, Form } from 'react-bootstrap';
import TechnicianCard from '../TechnicianCard/TechnicianCard';


const TechnicianModal = ({ 
  show, 
  onHide, 
  serviceId, 
  onBookingComplete,
  userId 
}) => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [specialization, setSpecialization] = useState(""); // Default value, can be changed
  const [technicianOffers, setTechnicianOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Fetch technicians when modal opens
  useEffect(() => {
    if (show && serviceId) {
      fetchTechnicians();
      fetchTechnicianOffers();
    }
  }, [show, serviceId, specialization]);

  const fetchTechnicians = async () => {
    setLoading(true);
    console.log("Fetching technicians for serviceId:", serviceId);
    try {
      const response = await fetch(
        `https://x8sdvnt5-5049.uks1.devtunnels.ms/api/Technician/GetTechniciansByService/${serviceId}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched technicians:", data);
      
      // Validate and sanitize the data
      const sanitizedData = Array.isArray(data) ? data.map(tech => {
        return {
          technicianId: tech.technicianId || Date.now(), // Fallback ID if missing
          name: tech.name || "Unknown Technician",
          specialization: tech.specialization || "",
          averageRating: tech.averageRating // Will be handled in TechnicianCard
        };
      }) : [];
      
      setTechnicians(sanitizedData);
    } catch (err) {
      console.error("Error fetching technicians:", err);
      setError("Failed to load technicians. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch technician offers
  const fetchTechnicianOffers = async () => {
    try {
      const response = await fetch(
        `https://x8sdvnt5-5049.uks1.devtunnels.ms/api/User/offers?serviceId=${serviceId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}` // Use token from localStorage
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched technician offers:", data);
      
      if (Array.isArray(data)) {
        setTechnicianOffers(data);
      }
    } catch (err) {
      console.error("Error fetching technician offers:", err);
      // Don't set an error state here to avoid disrupting main functionality
    }
  };

  const handleTechnicianSelect = (technician) => {
    setSelectedTechnician(technician);
    
    // Find the matching offer for this technician
    const matchingOffer = technicianOffers.find(
      offer => offer.technicianName === technician.name
    );
    
    setSelectedOffer(matchingOffer || null);
  };

  const handleDateChange = (date) => {
    setBookingDate(date);
  };

  const handleBookingSubmit = async () => {
    if (!selectedTechnician || !selectedOffer) {
      setError("Please select a technician with an available offer");
      return;
    }

    setBookingInProgress(true);
    
    try {
      // Use the confirm-booking endpoint with offerId
      const bookingData = {
        offerId: selectedOffer.offerId
      };
      
      console.log("Submitting booking confirmation with data:", bookingData);
      
      const response = await fetch(
        "https://x8sdvnt5-5049.uks1.devtunnels.ms/api/Booking/confirm-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('userToken')}` // Use token from localStorage
          },
          body: JSON.stringify(bookingData)
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error: ${response.status}`);
      }
      
      const responseData = await response.json().catch(() => ({}));
      console.log("Booking response:", responseData);
      
      // Extract booking ID from response
      // The API should return the booking ID in the response
      // Adjust this based on your actual API response structure
      const bookingId = responseData.bookingId || responseData.id || responseData.BookingId;
      
      if (!bookingId) {
        throw new Error("Booking ID not returned from server");
      }
      
      // Close the modal first
      onHide();
      
      // Call the onBookingComplete callback with just the booking ID
      onBookingComplete(bookingId);
      
    } catch (err) {
      console.error("Error confirming booking:", err);
      setError("Failed to confirm booking. Please try again.");
    } finally {
      setBookingInProgress(false);
    }
  };

  // Filter technicians based on specialization if entered
  const filteredTechnicians = specialization 
    ? technicians.filter(tech => 
        tech.specialization && 
        tech.specialization.toLowerCase().includes(specialization.toLowerCase())
      )
    : technicians;

  // Map the offers data to technicians based on name
  const techniciansWithOffers = filteredTechnicians.map(tech => {
    const matchingOffer = technicianOffers.find(offer => offer.technicianName === tech.name);
    return {
      ...tech,
      offeredPrice: matchingOffer ? matchingOffer.offeredPrice : null,
      offerId: matchingOffer ? matchingOffer.offerId : null
    };
  });

  const modalStyles = {
    modal: {
      '--bs-modal-bg': 'rgba(21, 37, 28, 0.95)',
      '--bs-modal-border-color': '#2d5a3d',
    }
  };

  const customModalClasses = `
    .modal-content {
      background: linear-gradient(135deg, #1a332b 0%, #0f1f18 100%) !important;
      border: 2px solid #2d5a3d !important;
      border-radius: 16px !important;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 
                  0 0 0 1px rgba(45, 90, 61, 0.3) !important;
      backdrop-filter: blur(10px) !important;
    }
    
    .modal-header {
      background: linear-gradient(90deg, #2d5a3d 0%, #1a4d2e 100%) !important;
      border-bottom: 2px solid #3d6b4f !important;
      border-radius: 14px 14px 0 0 !important;
      padding: 1.5rem !important;
    }
    
    .modal-title {
      color: #e8f5e8 !important;
      font-weight: 600 !important;
      font-size: 1.4rem !important;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
    }
    
    .btn-close {
      background: rgba(255, 255, 255, 0.1) !important;
      border-radius: 50% !important;
      padding: 0.75rem !important;
      opacity: 0.8 !important;
      transition: all 0.3s ease !important;
    }
    
    .btn-close:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      opacity: 1 !important;
      transform: scale(1.1) !important;
    }
    
    .modal-body {
      background: transparent !important;
      padding: 2rem !important;
      color: #e8f5e8 !important;
      max-height: 70vh !important;
      overflow-y: auto !important;
    }
    
    .modal-body::-webkit-scrollbar {
      width: 8px !important;
    }
    
    .modal-body::-webkit-scrollbar-track {
      background: rgba(45, 90, 61, 0.2) !important;
      border-radius: 4px !important;
    }
    
    .modal-body::-webkit-scrollbar-thumb {
      background: #2d5a3d !important;
      border-radius: 4px !important;
      transition: background 0.3s ease !important;
    }
    
    .modal-body::-webkit-scrollbar-thumb:hover {
      background: #3d6b4f !important;
    }
    
    .alert-danger {
      background: linear-gradient(135deg, #4a1a1a 0%, #2d1010 100%) !important;
      border: 1px solid #6d2c2c !important;
      color: #ffb3b3 !important;
      border-radius: 10px !important;
    }
    
    .alert-info {
      background: linear-gradient(135deg, #1a3d4a 0%, #10252d 100%) !important;
      border: 1px solid #2c5a6d !important;
      color: #b3e0ff !important;
      border-radius: 10px !important;
    }
    
    .btn-success {
      background: linear-gradient(135deg, #2d5a3d 0%, #1a4d2e 100%) !important;
      border: 2px solid #3d6b4f !important;
      color: #e8f5e8 !important;
      font-weight: 600 !important;
      padding: 1rem 2rem !important;
      border-radius: 12px !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 4px 15px rgba(45, 90, 61, 0.3) !important;
    }
    
    .btn-success:hover {
      background: linear-gradient(135deg, #3d6b4f 0%, #2d5a3d 100%) !important;
      border-color: #4d7b5f !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(45, 90, 61, 0.4) !important;
    }
    
    .btn-success:disabled {
      background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%) !important;
      border-color: #3a3a3a !important;
      color: #888 !important;
      transform: none !important;
      box-shadow: none !important;
    }
    
    .spinner-border-sm {
      color: #e8f5e8 !important;
    }
    
    .technicians-list {
      display: grid !important;
      gap: 1rem !important;
      margin-bottom: 1.5rem !important;
    }
    
    .text-center p {
      color: #b8e6c1 !important;
      margin-top: 1rem !important;
      font-size: 1.1rem !important;
    }
    
    .spinner-border {
      color: #2d5a3d !important;
    }
  `;

  return (
    <>
      <style>{customModalClasses}</style>
      <Modal 
        show={show} 
        onHide={onHide} 
        centered 
        size="lg"
        style={modalStyles.modal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select a Technician</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" variant="success" />
              <p className="mt-2">Loading technicians...</p>
            </div>
          ) : techniciansWithOffers.length === 0 ? (
            <Alert variant="info">
              {specialization 
                ? "No technicians match the specialization filter." 
                : "No technicians found for this service."}
            </Alert>
          ) : (
            <>
              <div className="technicians-list">
                {techniciansWithOffers.map((technician) => (
                  <TechnicianCard
                    key={technician.technicianId}
                    technician={technician}
                    selected={selectedTechnician?.technicianId === technician.technicianId}
                    onSelect={() => handleTechnicianSelect(technician)}
                    offeredPrice={technician.offeredPrice}
                  />
                ))}
              </div>

              {selectedTechnician && (
                <div className="mt-4">
                  {selectedOffer && (
                    <Alert variant="info" className="mt-3">
                      You're booking at the offered price of ${selectedOffer.offeredPrice.toFixed(2)}
                    </Alert>
                  )}
                  
                  <div className="d-grid gap-2 mt-4">
                    <button
                      className="btn btn-success"
                      onClick={handleBookingSubmit}
                      disabled={bookingInProgress || !selectedOffer}
                    >
                      {bookingInProgress ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TechnicianModal;
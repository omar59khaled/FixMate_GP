import React, { useState, useEffect } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { Container, Card, Table, Button, Spinner, Alert, Badge, Modal } from 'react-bootstrap';
import { Calendar2Check, CurrencyDollar, Person, Eye, CheckCircle, XCircle } from 'react-bootstrap-icons';
import './BookingSummmaries.css';

const BookingSummaries = () => {
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage
        const token = localStorage.getItem('userToken');
        
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }
        
        console.log('Fetching bookings with token authentication');
        
        const response = await fetch(`https://1smgdvqm-5049.uks1.devtunnels.ms/api/Booking/user/summaries`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication failed. Please log in again.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received bookings data:', data);
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format - expected array');
        }
        
        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Complete booking function
  const completeBooking = async (bookingId) => {
    try {
      setActionLoading(prev => ({ ...prev, [bookingId]: 'completing' }));
      
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      const response = await fetch(`https://1smgdvqm-5049.uks1.devtunnels.ms/api/Booking/complete-booking`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookingId })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to complete booking. Status: ${response.status}`);
      }
      
      // Update the booking status in the local state
      setBookings(prev => prev.map(booking => 
        booking.bookingId === bookingId 
          ? { ...booking, bookingStatus: 'completed' }
          : booking
      ));
      
      console.log('Booking completed successfully');
      
    } catch (err) {
      console.error('Error completing booking:', err);
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [bookingId]: null }));
      setShowModal(false);
    }
  };

  // Cancel booking function
  const cancelBooking = async (bookingId) => {
    try {
      setActionLoading(prev => ({ ...prev, [bookingId]: 'cancelling' }));
      
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }
      
      const response = await fetch(`https://1smgdvqm-5049.uks1.devtunnels.ms/api/Booking/cancel-booking`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookingId })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to cancel booking. Status: ${response.status}`);
      }
      
      // Remove the booking from the local state
      setBookings(prev => prev.filter(booking => booking.bookingId !== bookingId));
      
      console.log('Booking cancelled successfully');
      
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setError(err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [bookingId]: null }));
      setShowModal(false);
    }
  };

  // Handle action confirmation
  const handleActionConfirm = (action, booking) => {
    setModalAction(action);
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const executeAction = () => {
    if (modalAction === 'complete') {
      completeBooking(selectedBooking.bookingId);
    } else if (modalAction === 'cancel') {
      cancelBooking(selectedBooking.bookingId);
    }
  };

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    if (price === null || price === undefined) return 'N/A';
    return typeof price === 'number' ? price.toFixed(2) : price;
  };

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <Badge bg="success">Confirmed</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      case 'completed':
        return <Badge bg="info">Completed</Badge>;
      default:
        return <Badge bg="secondary">{status || 'Unknown'}</Badge>;
    }
  };

  // Check if booking can be completed or cancelled
  const canComplete = (status) => {
    return status?.toLowerCase() === 'confirmed' || status?.toLowerCase() === 'pending';
  };

  const canCancel = (status) => {
    return status?.toLowerCase() !== 'completed' && status?.toLowerCase() !== 'cancelled';
  };

  // Handle row click to navigate to booking details
  const handleRowClick = (bookingId) => {
    navigate(`/booking-summary/${bookingId}`);
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  if (loading) {
    return (
      <Container className="bookings-container py-5">
        <Card className="bookings-card">
          <Card.Body className="text-center">
            <Spinner animation="border" role="status" size="lg" className="text-success">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3 text-success">Loading your bookings...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

 if (error) {
  return (
    <div className="enhanced-error-container">
      <Container className="bookings-container py-5">
        <div className="error-wrapper">
  
  
          
          <Card className="enhanced-error-card">
            <Card.Body className="text-center p-5">
          
              <div className="error-icon-container mb-4">
                <div className="error-icon-wrapper">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" className="error-icon">
                    <circle cx="12" cy="12" r="10" stroke="#dc3545" strokeWidth="2"/>
                    <path d="M15 9l-6 6" stroke="#dc3545" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 9l6 6" stroke="#dc3545" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

  
              <div className="error-content">
                <h2 className="error-title">Authentication Required</h2>
                <p className="error-message">
                  We couldn't load your bookings because your session has expired. 
                  Please log in again to access your account.
                </p>
                
                {/* Error Details (collapsible) */}
                <details className="error-details mt-3">
                  <summary className="error-details-toggle">Technical Details</summary>
                  <div className="error-details-content">
                    <code className="error-code">{error}</code>
                  </div>
                </details>
              </div>

              {/* Action Buttons */}
              <div className="error-actions mt-4">
                <Link
                to="/login"
                  className="error-primary-btn me-3"
                
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="me-2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Sign In
                </Link>
                
                <Button 
                  variant="outline-secondary" 
                  className="error-secondary-btn"
                  onClick={() => window.location.reload()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="me-2">
                    <polyline points="23,4 23,10 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Try Again
                </Button>
              </div>

            
              
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

  return (
    <>
      <Container className=" py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="bookings-title text-success">
            <Calendar2Check className="me-2" />
            My Bookings
          </h2>
        </div>

        <Card className=" shadow-sm">
          <Card.Body>
            {bookings.length === 0 ? (
              <div className="text-center py-5">
                <Calendar2Check size={64} className="text-success mb-3" />
                <h4 className="text-success">No Bookings Found</h4>
                <p className="text-muted">You haven't made any bookings yet.</p>
                <Button variant="success" onClick={handleBackToServices}>
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="bookings-table mb-0">
                  <thead className="table-success">
                    <tr>
                      <th className="technician-col">
                        <Person className="me-2" />
                        Technician
                      </th>
                      <th className="date-col">
                        <Calendar2Check className="me-2" />
                        Date & Time
                      </th>
                      <th className="status-col text-center">Status</th>
                      <th className="price-col text-center">
                        <CurrencyDollar className="me-1" />
                        Price
                      </th>
                      <th className="action-col text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr 
                        key={booking.bookingId || index} 
                        className="booking-row"
                        data-status={booking.bookingStatus?.toLowerCase()}
                      >
                        <td className="technician-cell">
                          <div className="technician-info">
                            <div className="technician-name">
                              <strong>{booking.technicianName || 'Not assigned'}</strong>
                            </div>
                            {booking.userName && (
                              <div className="user-name text-muted small">
                                User: {booking.userName}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="date-cell">
                          <div className="booking-date">
                            {formatDate(booking.bookingDate)}
                          </div>
                        </td>
                        <td className="status-cell text-center">
                          {getStatusBadge(booking.bookingStatus)}
                        </td>
                        <td className="price-cell text-center">
                          <span className="booking-price text-success fw-bold">
                            ${formatPrice(booking.price)}
                          </span>
                        </td>
                        <td className="action-cell text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleRowClick(booking.bookingId)}
                              title="View Details"
                            >
                              <Eye />
                            </Button>
                            
                            {canComplete(booking.bookingStatus) && (
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => handleActionConfirm('complete', booking)}
                                disabled={actionLoading[booking.bookingId] === 'completing'}
                                title="Complete Booking"
                              >
                                {actionLoading[booking.bookingId] === 'completing' ? (
                                  <Spinner as="span" animation="border" size="sm" />
                                ) : (
                                  <CheckCircle />
                                )}
                              </Button>
                            )}
                            
                            {canCancel(booking.bookingStatus) && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleActionConfirm('cancel', booking)}
                                disabled={actionLoading[booking.bookingId] === 'cancelling'}
                                title="Cancel Booking"
                              >
                                {actionLoading[booking.bookingId] === 'cancelling' ? (
                                  <Spinner as="span" animation="border" size="sm" />
                                ) : (
                                  <XCircle />
                                )}
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>

        <div className="bookings-summary mt-4">
          <Card className="summary-card bg-success text-white">
            <Card.Body>
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="summary-stat">
                    <h3>{bookings.length}</h3>
                    <p className="mb-0 opacity-75">Total Bookings</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="summary-stat">
                    <h3 className="text-light">
                      {bookings.filter(b => b.bookingStatus?.toLowerCase() === 'confirmed').length}
                    </h3>
                    <p className="mb-0 opacity-75">Confirmed</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="summary-stat">
                    <h3 className="text-warning">
                      {bookings.filter(b => b.bookingStatus?.toLowerCase() === 'pending').length}
                    </h3>
                    <p className="mb-0 opacity-75">Pending</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="summary-stat">
                    <h3 className="text-info">
                      {bookings.filter(b => b.bookingStatus?.toLowerCase() === 'completed').length}
                    </h3>
                    <p className="mb-0 opacity-75">Completed</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === 'complete' ? 'Complete Booking' : 'Cancel Booking'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to {modalAction} this booking?
          </p>
          {selectedBooking && (
            <div className="mt-3 p-3 bg-light rounded">
              <strong>Booking Details:</strong>
              <br />
              Technician: {selectedBooking.technicianName || 'Not assigned'}
              <br />
              Date: {formatDate(selectedBooking.bookingDate)}
              <br />
              Price: ${formatPrice(selectedBooking.price)}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant={modalAction === 'complete' ? 'success' : 'danger'}
            onClick={executeAction}
            disabled={actionLoading[selectedBooking?.bookingId]}
          >
            {actionLoading[selectedBooking?.bookingId] ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                {modalAction === 'complete' ? 'Completing...' : 'Cancelling...'}
              </>
            ) : (
              modalAction === 'complete' ? 'Complete' : 'Cancel Booking'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookingSummaries;
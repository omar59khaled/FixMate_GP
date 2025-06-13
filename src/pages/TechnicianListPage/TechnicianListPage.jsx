import { useState, useEffect } from "react";
import { Star, ThumbsUp, User, Wrench, CheckCircle } from "lucide-react";

export default function TechniciansList() {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://3aee-156-217-196-157.ngrok-free.app/recommend_technicians", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
          },
          body: JSON.stringify({
            // Add any required data for the POST request here
          })
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setTechnicians(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
        <div className="text-center">
          <div className="spinner-border text-success" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading service professionals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
        <div className="card border-danger" style={{maxWidth: '400px'}}>
          <div className="card-body text-center">
            <div className="text-danger mb-3">
              <i className="fas fa-exclamation-triangle fa-3x"></i>
            </div>
            <h5 className="card-title text-danger">Service Unavailable</h5>
            <p className="card-text text-muted">{error}</p>
            <button 
              className="btn btn-success"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '2rem 0'}}>
      {/* Header */}
      <div className="container mb-5">
        <div className="text-center">
          <div className="mb-3">
            <Wrench size={48} className="text-success" />
          </div>
          <h1 className="display-4 text-success fw-bold mb-3">Service Professionals</h1>
          <p className="lead text-muted">Find certified technicians for your needs</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container">
        <div className="row g-4">
          {technicians.map((technician) => (
            <div key={technician.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-success text-white">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded-circle p-2 me-3">
                      <User size={24} className="text-success" />
                    </div>
                    <div>
                      <h5 className="card-title mb-1">{technician.name}</h5>
                      <small className="d-flex align-items-center">
                        <CheckCircle size={16} className="me-1" />
                        Certified Professional
                      </small>
                    </div>
                  </div>
                </div>
                
                <div className="card-body">
                  {/* Specialization */}
                  <div className="mb-3">
                    <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-pill px-3 py-2">
                      <Wrench size={16} className="me-1" />
                      {technician.Specialization}
                    </span>
                  </div>
                  
                  {/* Reviews Section */}
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="text-success mb-0">Client Reviews</h6>
                      <span className="badge bg-success rounded-pill">
                        <ThumbsUp size={14} className="me-1" />
                        {technician.positive_review_count || technician.positive_reviews?.length || 0}
                      </span>
                    </div>
                    
                    {technician.positive_reviews && technician.positive_reviews.slice(0, 2).map((review, index) => (
                      <div key={index} className="bg-light rounded p-3 mb-2">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong className="text-dark">{review.user_name}</strong>
                          <div className="text-warning">
                            <Star size={16} fill="currentColor" />
                            <small className="text-muted ms-1">
                              {review.confidence ? review.confidence.toFixed(1) : 'N/A'}
                            </small>
                          </div>
                        </div>
                        <p className="small text-muted mb-0 fst-italic">
                          "{review.review_text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
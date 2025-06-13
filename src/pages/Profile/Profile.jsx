import React, { useState, useEffect } from 'react';
import {
  User, Mail, Phone, MapPin, Camera, Edit3, Save, X, AlertCircle, CheckCircle, RefreshCw
} from 'lucide-react';
import './Profile.css';

const baseUrl = "https://x8sdvnt5-5049.uks1.devtunnels.ms";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', address: '', image: ''
  });
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ loading: true, saving: false });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken') || 'demo-token';
    if (!token) return setStatus({ loading: false });

    fetch(`${baseUrl}/api/User/profile`, {
      headers: token !== 'demo-token' ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        const profileData = {
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          image: data.image || data.imageUrl || ''
        };
        setProfile(profileData);
        setFormData({ ...profileData, image: null });
        setStatus({ loading: false });
      })
      .catch(() => {
        setProfile({ name: 'John Doe', email: 'user@example.com', phone: '01027373274', address: 'Denshway', image: '' });
        setFormData({ name: 'John Doe', email: 'user@example.com', phone: '01027373274', address: 'Denshway', image: null });
        setStatus({ loading: false });
        setMessage({ type: 'error', text: 'Failed to load profile. Showing fallback data.' });
      });
  }, []);

  const handleImage = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setMessage({ type: 'error', text: 'Invalid image file (must be <5MB).' });
    }
  };

  const saveProfile = async () => {
    setStatus({ ...status, saving: true });
    const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken') || 'demo-token';
    const form = new FormData();
    ['name', 'email', 'phone', 'address'].forEach(field => form.append(field.charAt(0).toUpperCase() + field.slice(1), formData[field] || ''));
    if (formData.image) form.append('Image', formData.image);

    try {
      const res = await fetch(`${baseUrl}/api/User/UpdateProfile`, {
        method: 'PUT',
        headers: token !== 'demo-token' ? { Authorization: `Bearer ${token}` } : {},
        body: form
      });

      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      const newProfile = {
        name: updated.name || formData.name,
        email: updated.email || formData.email,
        phone: updated.phone || formData.phone,
        address: updated.address || formData.address,
        image: updated.image || updated.imageUrl || preview || profile.image
      };
      setProfile(newProfile);
      setFormData({ ...newProfile, image: null });
      setEdit(false);
      setPreview(null);
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to update: ${err.message}` });
    } finally {
      setStatus({ ...status, saving: false });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (status.loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center">
        <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        <p className="mt-3">Loading profile...</p>
      </div>
    </div>
  );

  const displayImage = () => {
    if (edit && preview) return preview;
    if (profile.image?.startsWith('http')) return profile.image;
    return `${baseUrl}/${profile.image}` || 'https://via.placeholder.com/150x150?text=No+Image';
  };

  return (
    <div className="c-ard-container py-5">
      <div className="c-ard shadow-lg rounded">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Profile</h4>
          <button className="btn btn-light btn-sm rounded-circle" onClick={() => window.location.reload()}>
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="card-body">
          {message && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {message.text}
            </div>
          )}
          <div className="row">
            <div className="col-md-4 text-center">
              <img src={displayImage()} alt="Profile" className="rounded-circle img-thumbnail mb-3" style={{ width: 150, height: 150, objectFit: 'cover' }} />
              {edit && (
                <div className="mb-3">
                  <label className="btn btn-outline-secondary">
                    <Camera size={16} className="me-2" /> Upload
                    <input type="file" accept="image/*" hidden onChange={handleImage} />
                  </label>
                </div>
              )}
            </div>
            <div className="col-md-8">
              {['name', 'email', 'phone', 'address'].map(field => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-capitalize">{field}</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      {{ name: <User />, email: <Mail />, phone: <Phone />, address: <MapPin /> }[field]}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      disabled={!edit}
                      value={formData[field] || ''}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
              <div className="d-flex gap-2">
                {edit ? (
                  <>
                    <button className="btn btn-success" disabled={status.saving} onClick={saveProfile}>
                      <Save className="me-2" size={16} /> Save
                    </button>
                    <button className="btn btn-secondary" disabled={status.saving} onClick={() => setEdit(false)}>
                      <X className="me-2" size={16} /> Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => setEdit(true)}>
                    <Edit3 className="me-2" size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

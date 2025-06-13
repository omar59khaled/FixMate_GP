import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaToolbox, FaClipboardList, FaBars, FaUserTie } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import SideNav from '../../components/common/SideNavAdmin/SideNavAdmin';
import UserAvatar from '../../components/common/AdminNavbar/AdminNavbar';
import './AdminDashboardPage.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalTechnicians: 0,
    totalBookings: 0,
    pendingBookings: 0
  });
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('admin@example.com');

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        
        // Fetch all data from APIs
        const [usersRes, servicesRes, summaryRes] = await Promise.all([
          axios.get('https://x8sdvnt5-5049.uks1.devtunnels.ms/api/Dashboard/users', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://x8sdvnt5-5049.uks1.devtunnels.ms/api/Dashboard/services', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://x8sdvnt5-5049.uks1.devtunnels.ms/api/Dashboard/summary', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setSummaryData(summaryRes.data);
        
        // Set stats from API responses
        setStats({
          totalUsers: usersRes.data.length || 0,
          totalServices: servicesRes.data.length || 0,
          totalTechnicians: summaryRes.data.totalTechnicians || 0,
          totalBookings: summaryRes.data.totalBookings || 0,
          pendingBookings: summaryRes.data.pendingBookings || 0
        });
        
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  // Prepare data for charts
  const prepareMainOverviewData = () => {
    if (!summaryData) return [];
    const total = (summaryData.totalBookings || 0) + (summaryData.totalTechnicians || 0) + (summaryData.pendingBookings || 0);
    if (total === 0) return [];
    
    return [
      { 
        name: 'Total Bookings', 
        value: summaryData.totalBookings || 0, 
        percentage: ((summaryData.totalBookings || 0) / total * 100).toFixed(1),
        color: '#0088FE' 
      },
      { 
        name: 'Total Technicians', 
        value: summaryData.totalTechnicians || 0, 
        percentage: ((summaryData.totalTechnicians || 0) / total * 100).toFixed(1),
        color: '#00C49F' 
      },
      { 
        name: 'Pending Bookings', 
        value: summaryData.pendingBookings || 0, 
        percentage: ((summaryData.pendingBookings || 0) / total * 100).toFixed(1),
        color: '#FFBB28' 
      }
    ];
  };

  const prepareBookingStatusData = () => {
    if (!summaryData) return [];
    const totalBookings = summaryData.totalBookings || 0;
    const pendingBookings = summaryData.pendingBookings || 0;
    const completedBookings = totalBookings - pendingBookings;
    
    if (totalBookings === 0) return [];
    
    return [
      { 
        name: 'Completed', 
        value: completedBookings, 
        percentage: ((completedBookings / totalBookings) * 100).toFixed(1),
        color: '#00C49F' 
      },
      { 
        name: 'Pending', 
        value: pendingBookings, 
        percentage: ((pendingBookings / totalBookings) * 100).toFixed(1),
        color: '#FF8042' 
      }
    ];
  };

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger m-4" role="alert">{error}</div>;

  return (
    <div className="admin-layout">
      <nav className="admin-navbar">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={() => setIsSideNavOpen(!isSideNavOpen)}>
            <FaBars />
          </button>
          <h1 className="navbar-title">Admin </h1>
        </div>
        <div className="navbar-right">
          <UserAvatar email={currentUserEmail} />
        </div>
      </nav>

      <SideNav isOpen={isSideNavOpen} toggleSideNav={() => setIsSideNavOpen(false)} />

      <div className="admin-content">
        <div className="admin-dashboard p-4">
          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            {/* Total Users Card */}
            <div className="col-12 col-md-6 col-lg-3">
              <div 
                className="card h-100 border-0 shadow-sm clickable"
                onClick={() => handleCardClick('/admin/manage/users')}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                    <FaUsers className="text-primary fs-2" />
                  </div>
                  <div className="ms-3">
                    <h3 className="card-title h6 text-muted">Total Users</h3>
                    <p className="card-text h3 mb-0 fw-bold">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Services Card */}
            <div className="col-12 col-md-6 col-lg-3">
              <div 
                className="card h-100 border-0 shadow-sm clickable"
                onClick={() => handleCardClick('/admin/manage/services')}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3">
                    <FaToolbox className="text-success fs-2" />
                  </div>
                  <div className="ms-3">
                    <h3 className="card-title h6 text-muted">Total Services</h3>
                    <p className="card-text h3 mb-0 fw-bold">{stats.totalServices}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Technicians Card */}
            <div className="col-12 col-md-6 col-lg-3">
              <div 
                className="card h-100 border-0 shadow-sm clickable"
                onClick={() => handleCardClick('/admin/ManageTechniciansPage')}
              >
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-warning bg-opacity-10 p-3">
                    <FaUserTie className="text-warning fs-2" />
                  </div>
                  <div className="ms-3">
                    <h3 className="card-title h6 text-muted">Total Technicians</h3>
                    <p className="card-text h3 mb-0 fw-bold">{stats.totalTechnicians}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Bookings Card */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <div className="rounded-circle bg-info bg-opacity-10 p-3">
                    <FaClipboardList className="text-info fs-2" />
                  </div>
                  <div className="ms-3">
                    <h3 className="card-title h6 text-muted">Total Bookings</h3>
                    <p className="card-text h3 mb-0 fw-bold">{stats.totalBookings}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="row g-4">
            {/* Main Overview Pie Chart */}
            <div className="col-12 col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">System Overview</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={prepareMainOverviewData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {prepareMainOverviewData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [value, `${name} (${props.payload.percentage}%)`]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Booking Status Chart */}
            <div className="col-12 col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">Booking Status Distribution</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={prepareBookingStatusData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {prepareBookingStatusData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [value, `${name} (${props.payload.percentage}%)`]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Summary Statistics Card */}
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">Dashboard Summary</h5>
                  <div className="row text-center">
                    <div className="col-md-3">
                      <div className="p-3">
                        <h3 className="text-info">{stats.totalBookings}</h3>
                        <p className="text-muted mb-0">Total Bookings</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="p-3">
                        <h3 className="text-warning">{stats.totalTechnicians}</h3>
                        <p className="text-muted mb-0">Total Technicians</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="p-3">
                        <h3 className="text-danger">{stats.pendingBookings}</h3>
                        <p className="text-muted mb-0">Pending Bookings</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="p-3">
                        <h3 className="text-success">
                          {stats.totalBookings > 0 ? 
                            (((stats.totalBookings - stats.pendingBookings) / stats.totalBookings) * 100).toFixed(1) : 0}%
                        </h3>
                        <p className="text-muted mb-0">Completion Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';

const PersonalInformation = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Retrieve the token saved during login/signup
        const token = localStorage.getItem('token'); 

        const response = await fetch('https://remocoin.onrender.com/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // This tells the backend who you are
            'Authorization': `Bearer ${token}` 
          }
        });
        
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user data');
        }

        // Access the 'user' object from your backend response
        setUserData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="p-8 text-gray-500 text-center">Loading profile...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
  if (!userData) return <div className="p-8 text-center">No user data found.</div>;

  return (
    <div className="bg-gray-100 text-gray-800 p-8 max-w-2xl font-nunito rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Personal information</h2>
      </div>

      <div className="space-y-6">
        <InfoRow label="Country of Residence" value={userData.country} />
        <InfoRow label="Legal Name" value={userData.name} />
        <InfoRow label="Email Address" value={userData.email} />
        <InfoRow label="Phone Number" value={userData.phoneNumber} />
        <InfoRow label="Date of Signing Up" value={new Date(userData.signupDate).toLocaleDateString()} />
      </div>
    </div>
  );
};

// Helper component for clean rows
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="text-sm font-medium">{value || 'Not provided'}</span>
  </div>
);

export default PersonalInformation;
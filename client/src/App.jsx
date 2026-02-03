import React, { useState } from 'react';
import ConnectionForm from './components/ConnectionForm';
import Dashboard from './components/Dashboard';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setIsConnected(true);
      } else {
        setError(data.message || 'Connection failed');
      }
    } catch (err) {
      setError(`Failed to connect to backend server: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsConnected(false);
    // Ideally call API to disconnect
  };

  return (
    <>
      {!isConnected ? (
        <ConnectionForm onConnect={handleConnect} isLoading={loading} error={error} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;

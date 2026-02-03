import React, { useState } from 'react';

const ConnectionForm = ({ onConnect, isLoading, error }) => {
    const [formData, setFormData] = useState({
        host: 'localhost',
        user: 'root',
        password: '',
        database: '',
        port: '3306'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConnect(formData);
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ maxWidth: '400px', margin: '10vh auto', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Connect to MySQL</h2>

            {error && (
                <div style={{ padding: '0.75rem', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontSize: '0.9rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">Host</label>
                    <input
                        type="text"
                        name="host"
                        className="input-field"
                        value={formData.host}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label className="input-label">User</label>
                        <input
                            type="text"
                            name="user"
                            className="input-field"
                            value={formData.user}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="input-label">Port</label>
                        <input
                            type="number"
                            name="port"
                            className="input-field"
                            value={formData.port}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="input-field"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Database Name</label>
                    <input
                        type="text"
                        name="database"
                        className="input-field"
                        value={formData.database}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                    {isLoading ? 'Connecting...' : 'Connect'}
                </button>
            </form>
        </div>
    );
};

export default ConnectionForm;

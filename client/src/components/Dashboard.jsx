import React, { useState, useEffect } from 'react';

const Dashboard = ({ onLogout }) => {
    const [tables, setTables] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTable, setActiveTable] = useState(null);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/tables');
            if (!res.ok) throw new Error('Failed to fetch tables');
            const data = await res.json();
            setTables(data);
        } catch (err) {
            console.error(err);
        }
    };

    const runQuery = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults(null);
        try {
            const res = await fetch('http://localhost:3000/api/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sql: query })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Query failed');
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTableClick = async (tableName) => {
        setActiveTable(tableName);
        setLoading(true);
        setError(null);
        setResults(null);
        setQuery(`SELECT * FROM ${tableName} LIMIT 100`);
        try {
            const res = await fetch(`http://localhost:3000/api/tables/${tableName}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to fetch table data');
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Sidebar */}
            <div className="glass-panel" style={{ width: '250px', margin: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Tables</h3>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {tables.map(table => (
                        <div
                            key={table}
                            onClick={() => handleTableClick(table)}
                            style={{
                                padding: '0.5rem 0.75rem',
                                cursor: 'pointer',
                                borderRadius: '6px',
                                marginBottom: '0.25rem',
                                backgroundColor: activeTable === table ? 'var(--primary-color)' : 'transparent',
                                color: activeTable === table ? 'white' : 'var(--text-secondary)',
                                transition: 'all 0.2s'
                            }}
                        >
                            {table}
                        </div>
                    ))}
                </div>
                <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <button onClick={onLogout} className="btn btn-secondary" style={{ width: '100%' }}>Disconnect</button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem 1rem 1rem 0' }}>

                {/* Query Editor */}
                <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem' }}>
                    <form onSubmit={runQuery}>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter SQL Query..."
                                className="input-field"
                                style={{
                                    height: '100px',
                                    fontFamily: 'monospace',
                                    resize: 'none',
                                    fontSize: '14px',
                                    lineHeight: '1.4'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center' }}>
                            <div style={{ color: error ? 'var(--danger-color)' : 'transparent' }}>
                                {error}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Running...' : 'Run Query'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results */}
                <div className="glass-panel" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                        <h3 style={{ fontSize: '1.1rem' }}>Results</h3>
                    </div>
                    <div style={{ flex: 1, overflow: 'auto', padding: '0' }}>
                        {results && results.rows ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(26, 28, 35, 1)', zIndex: 10 }}>
                                    <tr>
                                        {results.fields && results.fields.map(field => (
                                            <th key={field.name} style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                                                {field.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.rows.map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            {results.fields.map(field => (
                                                <td key={field.name} style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>
                                                    {typeof row[field.name] === 'object' ? JSON.stringify(row[field.name]) : String(row[field.name])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                No results to display
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

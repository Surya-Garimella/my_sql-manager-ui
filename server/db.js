import mysql from 'mysql2/promise';

let connection = null;

export const connectToDatabase = async (config) => {
    if (connection) {
        await connection.end();
    }
    try {
        connection = await mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port || 3306
        });
        return { success: true, message: 'Connected successfully' };
    } catch (error) {
        console.error('Database connection failed:', error);
        return { success: false, message: error.message };
    }
};

export const getConnection = () => {
    if (!connection) {
        throw new Error('Not connected to any database');
    }
    return connection;
};

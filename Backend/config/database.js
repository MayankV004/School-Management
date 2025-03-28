import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const pool = mysql.createPool({
    uri: process.env.MYSQL_URL, // Using the cloud MySQL URL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    queueLimit: 0,
    
});

// Creating schools table
const createSchoolTable = async () => {
    try {
        const conn = await pool.getConnection(); // Get connection from pool
        await conn.query(`
            CREATE TABLE IF NOT EXISTS schools (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        conn.release(); // Return connection back to DB
        console.log('School Table Created');
    } catch (error) {
        console.error("Error in creating table:", error);
    }
};

createSchoolTable();

export default pool;

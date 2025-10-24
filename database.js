import dotenv from 'dotenv';
import pkg from 'sequelize';
const { Sequelize } = pkg;

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  dialect: 'mysql'
});

export {sequelize};

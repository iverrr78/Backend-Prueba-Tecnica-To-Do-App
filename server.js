import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {sequelize} from './database.js';
import {Routes} from './src/routes/routes.js';

// Initialize environment variables
dotenv.config();

// Create server instance
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Initialize database tables
const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set to true to drop existing tables
    console.log('✅ Database tables synchronized successfully.');
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
  }
};

// Initialize database when server starts
initializeDatabase();

server.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// Mount routes
Routes(server);

export default server;
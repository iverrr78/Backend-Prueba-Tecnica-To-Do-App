import dotenv from 'dotenv';
import pkg from 'sequelize';
const { Sequelize } = pkg;

dotenv.config();

// Create Sequelize instance with SSL configuration
const sequelize = new Sequelize(process.env.STACKHERO_MYSQL_DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  logging: false
});

export {sequelize};

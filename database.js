import dotenv from 'dotenv';
import pkg from 'sequelize';
const { Sequelize } = pkg;

dotenv.config();

// Create Sequelize instance
//const sequelize = new Sequelize({
  //host: process.env.STACKHERO_MYSQL_HOST || 'localhost',
  //port: process.env.STACKHERO_MYSQL_PORT || 3306,
  //database: process.env.DB_NAME || '',
  //username: process.env.DB_USER || '',
  //password: process.env.STACKHERO_MYSQL_ROOT_PASSWORD || '',
  //dialect: 'mysql'
//});

const sequelize = new Sequelize(process.env.STACKHERO_MYSQL_DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

export {sequelize};

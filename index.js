import server from './server.js';
import {sequelize} from './database.js';
import {Routes} from './src/routes/routes.js';
import morgan from 'morgan';


// Main function to start the server
const main = async () => {
    await sequelize.sync({force: true});
    Routes(server);
    server.use(morgan('dev'));
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

main();

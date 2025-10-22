import server from './server.js';
import {sequelize} from './database.js';

// Main function to start the server
const main = async () => {
    await sequelize.sync({force: false});
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

main();

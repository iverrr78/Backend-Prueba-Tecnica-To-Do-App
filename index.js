import server from './server.js';
import morgan from 'morgan';


// Main function to start the server
const main = async () => {
    server.use(morgan('dev'));
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

main();

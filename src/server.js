import app from './app.js';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';

dotenv.config();

//Handling Uncaught Exception
process.on("uncaughtException",err=>{
    console.log(`!!!\nError: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception\n!!!`);
    process.exit(1);
});

connectDatabase();

const server = app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on https://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`!!!\nError: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection\n!!!`);
    server.close(() => {
        process.exit(1);
    });
});
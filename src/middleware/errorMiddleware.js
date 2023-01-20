import ErrorHandler from '../utils/errorhandler.js'
import {logEvents} from '../middleware/logEvents.js'

export default (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongodb Id Error
    if (err.name === "CastError")
        err = new ErrorHandler(`Resource not found. Invalid:${err.path}`,400);

    if(err.code === 11000)
        err = new ErrorHandler('Email already exists',400);

    logEvents(`${err.statusCode}: ${err.message}`, 'errLog.txt');

    res.status(err.statusCode).json({
        status:err.statusCode,
        error:err.message
    });
}
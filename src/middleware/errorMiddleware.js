import ErrorHandler from '../utils/errorhandler.js'
import {logEvents} from '../middleware/logEvents.js'

export default (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongodb Id Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid:${err.path}`;
        err = new ErrorHandler(message,400);
    }

    logEvents(`${err.statusCode}: ${err.message}`, 'errLog.txt');

    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    });
}
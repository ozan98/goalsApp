const errorHandler = (err, req, res, next) => {
    //check if what the status code is. if the status code istn already set
    // then it will set ass 500
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    //send message as json
    //if in production, the error stack will be sent for debugging.
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}
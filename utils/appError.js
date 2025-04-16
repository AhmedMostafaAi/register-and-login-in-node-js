class AppError extends Error {
    constructor(message, statusCode, statusText){
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}

module.exports = (message, statusCode, statusText) => new AppError(message, statusCode, statusText);

const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParams) {
        let message = "";
        invalidParams.forEach(param => message += `${param}\n`);

        super(`The request has the following invalid parameters:\n${message}`, 400);
    }
}

module.exports = BadRequestError;
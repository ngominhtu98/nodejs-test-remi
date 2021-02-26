const modifyResponse = (req, res, next) => {
    res.sendData = (data = {}, code = 200) => {
        res.status(code).json({
            success: true,
            data,
        })
    }

    res.sendError = (errors = {}, message = '', code = 400) => {
        res.status(+code).json({
            success: false,
            message,
            errors,
        })
    }

    next();
}

module.exports = modifyResponse;

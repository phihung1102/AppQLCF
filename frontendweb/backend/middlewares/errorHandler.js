const errorHandler = (err, req, res, next) => {
    console.error("🔥 ERROR START 🔥");
    console.error(err);   // log toàn bộ lỗi (message, stack, mysql error...)
    console.error("🔥 ERROR END 🔥");

    const statusCode = err.statusCode || 400;

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};

export default errorHandler;

const isAdmin = (req, res, next) => {
    const { user } = req; 
    if (user && user.role === "admin") {
        next();
    } else {
        res.status(403).json({
            message: "Permission denied. Only admins can perform this action.",
            status: false,
            statusCode: 403,
        });
    }
};

module.exports = isAdmin;

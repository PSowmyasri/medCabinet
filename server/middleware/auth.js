const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    try {
        const token = res.cookies.token;
        if (!token)
            return res.status(401).json({ message: "UnAuthorised access" });

        //verify the JWT token received from cookie
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "UnAuthorised access" });
    }
}
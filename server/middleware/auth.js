const jwt = require("jsonwebtoken")

const sercretKEy = "romnickPogi"

const middleware = (req, res, next) => {
    // const authHeader = req.header("Authorization")
    const token = req.cookies.token

    // console.log("token", token)

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    // const token = authHeader.split(" ")[1]
    // console.log("s",token)
    try {
        const decoded = jwt.verify(token, sercretKEy)
        req.user = decoded
        // console.log(decoded)
        next()
    } catch (error) {
        // throw new Error(error)
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired. Please log in again." });
        }
        return res.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = { middleware }
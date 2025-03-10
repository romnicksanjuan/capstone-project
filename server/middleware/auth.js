const jwt = require("jsonwebtoken")

const sercretKEy = "romnickPogi"

const middleware = (req, res, next) => {
    const authHeader = req.header("Authorization")

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    const token = authHeader.split(" ")[1]
    // console.log("s",token)

    if (!token) {
        return res.status(500).json({ success: false, message: "Session Expired, Please Login Again" })
    }

    try {
        const decoded = jwt.verify(token, sercretKEy)
        req.admin = decoded
        // console.log(decoded)
        next()
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { middleware }
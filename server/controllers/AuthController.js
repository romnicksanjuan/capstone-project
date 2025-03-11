const verifyToken = async (req, res) => {
    res.status(200).json({message: "You are authorize"})
}

module.exports = verifyToken
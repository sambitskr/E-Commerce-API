import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json({ Message: "Unauthenticated, login first" })

    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            res.status(404).json({Message : "Invalid token"})
            return 
        }
        else {
            req.user = decoded
            next()
        }

    })

}
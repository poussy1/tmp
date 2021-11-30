const jwt = require("jsonwebtoken"); 


const validateToken = (req, res, next) => {

    const tokenHeader = req.headers.token;
    if(tokenHeader){

        const token = tokenHeader.split(" ")[1];
        
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {

            if(err) {
                console.log("Token is niet Juist inside err");
                res.status(403).json("Token is niet Juist");
            }
            req.user = user;
            next();
            });

    }else {
        return res.status(401).json("U bent niet geauthenticeerd  !  validateToken")
    }
};

const validateTokenAuthorisation = (req, res, next) => {
    validateToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.admin){
            next();
        }else{
            res.status(403).json("U bent niet geauthoriseerd! validateTokenAuthorisation")
        }
        });
};

const validateTokenAdmin = (req, res, next) => {
    validateToken(req, res, () => {
        if(req.user.admin){
            next();
        }else{
            res.status(403).json("Enkel een beheerder is toegelaten ! ")
        }
        });
};

module.exports = {
    validateToken ,
    validateTokenAdmin,
    validateTokenAuthorisation
};
const jwt=require("jsonwebtoken");

const { HttpError } = require("../helpers");

const User = require("../models/user");

const { SECRET_KEY } = process.env;

const getAuthData = (data) => {

    let tokenParts = {};

    const getTypeofReq = (value) => {
        for(const k of Object.keys(value)) {
            if(value[k] === true) return k;
        };
    };
    
    if(getTypeofReq(data.route.methods) === 'get' | getTypeofReq(data.route.methods) === 'delete') {
        
        const { authorization = '' } = data.headers;
        const [ bearer, token ] = authorization.split(' ');
       
        tokenParts = {...tokenParts, bearer, token }
    }else {
     
        const { Authorization = '' } = data.body.headers;
        const [ bearer, token ] = Authorization.split(' ');

        tokenParts = {...tokenParts, bearer, token }
    };

    return tokenParts;

};

// or use passport (passport jwt)
const authentificate = async (req, res, next) => {
    const tokenData = getAuthData(req);

    const { bearer, token } = tokenData;

    if(bearer !== 'Bearer') next(HttpError(401, "Incorrect token"));
    
    try{
        
        // check that token was crypt SECRET_KEY
        // verify retur payload with 'id' only in our case
        const {id} = jwt.verify(token, SECRET_KEY);
        
        // user with such id exist?
        const user = await User.findById(id);

        // no user || no 'token' in DB || 'toke' value is not equal to 'token' in DB
        if(!user || !user.token || user.token !== token) { // person login on other devices (auto logout)
            
            next(HttpError(401, "Not authorized"));
        }

        // add user to req information
        req.user = user;
       
        //yes
        next();
    }
    catch {
      
        next(HttpError(401));
    }
};

module.exports = authentificate;
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * @description authenticates the JWT
 */

const authenticateToken = asyncHandler(async (req, res, next) => {
    let token = req.cookies?.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        }catch(error){
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }

    }else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

export { authenticateToken };
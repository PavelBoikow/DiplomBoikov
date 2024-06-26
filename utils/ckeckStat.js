import jwt from 'jsonwebtoken';
import UserSchema from "../models/User.js";

export default async (req, res, next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try
        {
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id;
            const user = await UserSchema.findById(req.userId);        
            if (user._doc.status==2){
                next();
            }
            else{
                res.status(403).json({
                    message: 'Нет доступа',
                });}
        
        } 
        catch(err) {
            console.log(err);
            res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else{
        return res.status(403).json({
            message:'Нет доступа',
        })
    }
}
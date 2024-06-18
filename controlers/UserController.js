import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserSchema from "../models/User.js";

export const register = async (req, res)=>{
    try
    {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserSchema({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            status:0,
        })
        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn:'30d',
            },
        );
        
        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
             token,
            });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

export const login = async (req, res)=>{
    try {
        const user = await UserSchema.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        };
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass){
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        };
        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn:'30d',
            },
        );
        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
             token,
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const Users = await UserSchema.find().exec();
        res.json(Users.sort((a,b)=> a.date_field>b.date_field?1:-1));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getOne = (req, res) => {
    try {
        const userId = req.params.id    
        UserSchema.findOneAndUpdate({
        _id: userId,
        },{
        returnDocument: 'after',
        },
        ).then((user) => {
        if (!user) {
        return res.status(404).json({
        message: 'Статьтя не найдена',
        })
        }
        res.json(user)
        })
        } catch (error) {
        console.log(error)
        res.status(500).json({
        messgae: 'Не удалось получить статью',
        })
        }
};

export const update = async (req, res) => {
    try {
        const userId = req.params.id;

        await UserSchema.updateOne({
            _id: userId,
        },{
            email: req.body.email,
            fullName: req.body.fullName,
            status:req.body.status,
        })

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};

export const getMe = async (req, res) =>{
    try{
        const user = await UserSchema.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        const {passwordHash, ...userData } = user._doc;

        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};


export const remove = async (req, res) => {
    try {
        const userId = req.params.id;

        UserSchema.findOneAndDelete({
            _id: userId,
        }).then((post) => {
            if (!post) {
            return res.status(404).json({
            message: 'Статьтя не найдена',
            })
        }

        res.json({
            success: true,
        })
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить сатью',
        });
    }
};
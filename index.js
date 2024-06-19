
import express from "express";
import multer from "multer";
import cors from 'cors';
import fs from "fs";

import mongoose from "mongoose";

import {registerValidator, loginValidator, postCreateValidator, studCreateValidator} from './validations.js';

import {PostController, UserController, StudController, InfoController} from './controlers/index.js';
import {handleValidationsErrors , ckeckAuth, ckeckStat} from "./utils/index.js";

mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log('DB ok'))
.catch((err) => console.log('DB error',err));

const app = express();


const storage = multer.diskStorage({
    destination: (_, __, cb)=>{
        if (!fs.existsSync('uploads')){
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb)=>{
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/auth/me', ckeckAuth, UserController.getMe);
app.post('/auth/login', loginValidator, handleValidationsErrors, UserController.login);
app.post('/auth/register', registerValidator, handleValidationsErrors, UserController.register);
app.get('/auth/all' , UserController.getAll);
app.get('/auth/:id', ckeckStat , UserController.getOne);
app.patch('/auth/:id', ckeckStat, UserController.update);
app.delete('/auth/:id', ckeckStat , UserController.remove);

app.post('/upload', ckeckAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});



app.get('/info', InfoController.getAll);
app.get('/info/:id', InfoController.getOne);
app.post('/info', ckeckAuth , InfoController.create);
app.delete('/info/:id', ckeckAuth , InfoController.remove);
app.patch('/info/:id', ckeckAuth, InfoController.update);


app.get('/posts/popularity', PostController.getAllPopularity);
app.get('/posts', PostController.getAll);
app.get('/tags',PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', ckeckAuth , postCreateValidator, handleValidationsErrors, PostController.create);
app.delete('/posts/:id', ckeckAuth , PostController.remove);
app.patch('/posts/:id', ckeckAuth, postCreateValidator, handleValidationsErrors, PostController.update);


app.get('/StudentAssociations', StudController.getAll);
app.get('/StudentAssociations/:id', StudController.getOne);
app.post('/StudentAssociations', ckeckAuth , studCreateValidator, handleValidationsErrors, StudController.create);
app.delete('/StudentAssociations/:id', ckeckAuth , StudController.remove);
app.patch('/StudentAssociations/:id', ckeckAuth, studCreateValidator, handleValidationsErrors, StudController.update);


app.listen(process.env.PORT || 4444,(err)=>{
    if (err){
        return console.log(err);
    }
    
    console.log('Server OK');
});
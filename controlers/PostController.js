import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) =>{
    try {
        const posts = await PostModel.find().exec();
        const tags = posts.map(obj => obj.tags).flat().sort((a,b)=> a.date_field>b.date_field?1:-1).slice(0, 5);

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts.sort((a,b)=> a.date_field>b.date_field?1:-1));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getAllPopularity = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts.sort((a,b)=> a.viewsCount>b.viewsCount?-1:1));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getOne = (req, res) => {
    try {
        const postId = req.params.id    
        PostModel.findOneAndUpdate({
        _id: postId,
        },{
        $inc: { viewsCount: 1 },
        },{
        returnDocument: 'after',
        },
        ).populate('user').then((post) => {
        if (!post) {
        return res.status(404).json({
        message: 'Статьтя не найдена',
        })
        }
        res.json(post)
        })
        } catch (error) {
        console.log(error)
        res.status(500).json({
        messgae: 'Не удалось получить статью',
        })
        }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId,
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

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        },{
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
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
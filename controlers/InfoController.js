import InfoModel from '../models/Info.js';

export const getAll = async (req, res) => {
    try {
        const posts = await InfoModel.find().exec();
        res.json(posts);
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
        InfoModel.findOneAndUpdate({
        _id: postId,
        },{
        returnDocument: 'after',
        },
        ).then((info) => {
        if (!info) {
        return res.status(404).json({
        message: 'Статьтя не найдена',
        })
        }

        res.json(info)
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
        const doc = new InfoModel({
            title: req.body.title,
            text: req.body.text,
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

        InfoModel.findOneAndDelete({
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

        await InfoModel.updateOne({
            _id: postId,
        },{
            text: req.body.text,
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
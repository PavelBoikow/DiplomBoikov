import StudModel from '../models/Stud.js';

export const getAll = async (req, res) => {
    try {
        const studs = await StudModel.find().exec();
        res.json(studs.sort((a,b)=> a.date_field>b.date_field?1:-1));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getOne = (req, res) => {
    try {
        const studId = req.params.id    
        StudModel.findOneAndUpdate({
        _id: studId,
        },{
        returnDocument: 'after',
        },
        ).then((stud) => {
        if (!stud) {
        return res.status(404).json({
        message: 'Статьтя не найдена',
        })
        }
        res.json(stud)
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
        const doc = new StudModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
        });

        const stud = await doc.save();

        res.json(stud);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const studId = req.params.id;

        StudModel.findOneAndDelete({
            _id: studId,
        }).then((stud) => {
            if (!stud) {
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
        const studId = req.params.id;

        await StudModel.updateOne({
            _id: studId,
        },{
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
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
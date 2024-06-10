import mongoose from "mongoose";

const StudSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
        unique: true,
    },
    imageUrl:{
        type: String,
    },
},{
    timestamps:true,
}
);

export default mongoose.model('stud', StudSchema)
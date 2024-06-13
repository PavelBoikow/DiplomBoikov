import mongoose from "mongoose";

const InfoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
        unique: true,
    },
},{
    timestamps:true,
}
);

export default mongoose.model('Info', InfoSchema)
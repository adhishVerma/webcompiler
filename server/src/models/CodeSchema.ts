import mongoose from "mongoose";

interface ICodeSchema{
    html : string;
    css : string;
    javascript : string;
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
    html : String,
    css : String,
    javascript : String
})

export const Code = mongoose.model("Code", CodeSchema);
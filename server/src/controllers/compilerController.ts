import { Request, Response } from "express";
import { Code } from "../models/CodeSchema";

const saveCode = async (req: Request, res: Response) => {
    const { fullCode } = req.body;
    try {
        const newCode = await Code.create({
            fullCode: fullCode
        })
        return res.status(201).send({ url: newCode._id, status: 'saved' });
    } catch (error) {
        return res.status(500).send({ message: "Error saving code", error })
    }
}

const loadCode = async (req: Request, res: Response) => {
    const { urlId } = req.body;
    try {
        const existingCode = await Code.findById(urlId);
        if (!existingCode) {
            return res.status(404).send({ message: "code not found" })
        }
        return res.status(200).send({ fullCode: existingCode.fullCode, status: 'succeeded' });
    } catch (error) {
        return res.status(404).send({ message: "code not found", error: error })
    }
}

const updateCode = async (req: Request, res: Response) => {
    const { urlId, fullCode } = req.body;
    try {
        const existingCode = await Code.findById(urlId);
        if (!existingCode) {
            return res.status(404).send({ message: "code not found" })
        } else {
            existingCode.fullCode = fullCode
            await existingCode.save();
        }
        return res.status(200).send({ fullCode: existingCode.fullCode, status: 'succeeded' });
    } catch (error) {
        return res.status(404).send({ message: "code not found", error: error })
    }
}


export { saveCode, loadCode, updateCode };
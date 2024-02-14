import { Request, Response } from "express";
import { Code } from "../models/CodeSchema";

const saveCode = async (req: Request, res: Response) => {
    const { fullCode } = req.body;
    try {
        const newCode = await Code.create({
            html: fullCode.html,
            css: fullCode.css,
            javascript: fullCode.javascript
        })
        return res.status(201).send(newCode);
    } catch (error) {
        return res.status(500).send({ message: "Error saving code", error })
    }
}

export { saveCode };
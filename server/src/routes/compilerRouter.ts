import express from 'express';
import { loadCode, saveCode, updateCode } from '../controllers/compilerController';

export const compilerRouter = express.Router();

compilerRouter.post("/save", saveCode);
compilerRouter.put("/save", updateCode);
compilerRouter.post("/load", loadCode);
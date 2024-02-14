import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Save, Share2 } from 'lucide-react';
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { CompilerSliceStateType, updateCurrentLanguage } from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { Badge } from "./ui/badge";
import { useState } from "react";

const fileNames = {
    html : 'index.html',
    css : 'style.css',
    javascript : 'main.js'
}

const CodeControls = () => {
    
    const dispatch = useDispatch()
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)
    
    const [file,setFile] = useState(fileNames[currentLanguage]);

    const valueChange = (val: string) => {
        dispatch(updateCurrentLanguage(val as CompilerSliceStateType["currentLanguage"]));
        setFile(fileNames[val as CompilerSliceStateType["currentLanguage"]])
    }


    return (
        <div className="__helper_header px-2 w-full h-[48px] flex justify-between items-center">
            <p className="grow">
                <Badge>{file}</Badge>
            </p>
            <div className="grow-0 flex gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild={true}>
                            <Button variant="outline" size="icon" className="p-2"><Save className="w-6 h-6" /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>save</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild={true}><Button variant="outline" size="icon" className="p-2"><Share2 className="w-6 h-6" /></Button></TooltipTrigger>
                        <TooltipContent>
                            <p>share</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Select onValueChange={valueChange} defaultValue={currentLanguage}>
                    <SelectTrigger className="focus:ring-0 active:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">Javascript</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default CodeControls
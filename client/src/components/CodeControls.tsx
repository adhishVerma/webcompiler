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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Save, Share2, Loader2, Copy } from 'lucide-react';
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { CompilerSliceStateType, updateCurrentLanguage } from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { handleError } from "@/utils/handleError";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner"

const fileNames = {
    html: 'index.html',
    css: 'style.css',
    javascript: 'main.js'
}

const CodeControls = () => {

    const { id } = useParams();

    const [saveLoading, setSaveLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)
    const htmlCode = useSelector((state: RootState) => state.compilerSlice.html);
    const cssCode = useSelector((state: RootState) => state.compilerSlice.css);
    const javascriptCode = useSelector((state: RootState) => state.compilerSlice.javascript);

    const [file, setFile] = useState(fileNames[currentLanguage]);

    const valueChange = (val: string) => {
        dispatch(updateCurrentLanguage(val as CompilerSliceStateType["currentLanguage"]));
        setFile(fileNames[val as CompilerSliceStateType["currentLanguage"]])
    }

    const createCode = async () => {
        const response = await axios.post(`http://localhost:9000/editor/save/`, {
            "fullCode": {
                "html": htmlCode,
                "css": cssCode,
                "javascript": javascriptCode
            }
        })
        navigate(`/editor/${response.data.url}`, { replace: true });
    }

    const saveCode = async () => {
        const response = await axios.put(`http://localhost:9000/editor/save/`, {
            "urlId": id,
            "fullCode": {
                "html": htmlCode,
                "css": cssCode,
                "javascript": javascriptCode
            }
        })
    }

    const handleCopy = async () => {
        window.navigator.clipboard.writeText(window.location.href)
        toast("link copied");
    }

    const handleSave = async () => {
        setSaveLoading(true);
        try {
            if (id) {
                // update existing code
                await saveCode();
            }else{
                await createCode();
            }
        } catch (error) {
            handleError(error);
        } finally {
            setSaveLoading(false)
        }
    }

    return (
        <div className="__helper_header px-2 w-full h-[48px] flex justify-between items-center">
            <div className="grow">
                <Badge>{file}</Badge>
            </div>
            <div className="grow-0 flex gap-2">
                <TooltipProvider >
                    <Tooltip>
                        <TooltipTrigger asChild={true}>
                            <Button disabled={saveLoading} variant="outline" size="icon" className="p-2">
                                {saveLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" onClick={handleSave} />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>save</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {id && <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="p-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Share2 className="w-6 h-6" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>share</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Share your Code!</DialogTitle>
                            <DialogDescription>
                                <div className="flex justify-between items-center my-2 gap-1">
                                    <Input type="text" value={window.location.href} />
                                    <Button variant="outline" size="icon" className="p-2" onClick={handleCopy}><Copy /></Button>
                                </div>
                                Share your code with others via this link
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>}
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
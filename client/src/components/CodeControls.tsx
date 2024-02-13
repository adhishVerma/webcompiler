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

const CodeControls = () => {
    const valueChange = (val: any) => {
        console.log(val)
    }

    return (
        <div className="__helper_header p-1 w-full flex justify-between items-center">
            <p className="grow">FileName</p>
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
                <Select onValueChange={valueChange}>
                    <SelectTrigger className="focus:ring-0 active:ring-0">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Html">HTML</SelectItem>
                        <SelectItem value="Css">CSS</SelectItem>
                        <SelectItem value="Javascript">Javascript</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default CodeControls
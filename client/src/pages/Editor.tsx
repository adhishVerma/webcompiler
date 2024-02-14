import CodeEditor from "@/components/CodeEditor"
import CodeControls from "@/components/CodeControls"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeRenderer from "@/components/CodeRenderer"
import { Badge } from "@/components/ui/badge"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { handleError } from "@/utils/handleError"
import axios from "axios"
import { useDispatch } from "react-redux"
import { saveFullCode } from "@/redux/slices/compilerSlice"
import { toast } from "sonner"

const Editor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      const response = await axios.post(`http://localhost:9000/editor/load/`, {
        urlId: id
      })
      const { fullCode } = response.data;
      dispatch(saveFullCode(fullCode));
    } catch (error) {
      if(axios.isAxiosError(error)){
        if(error?.response?.status === 404){
          toast("Invalid URL, Begin with a new code");
        }
      }
      handleError(error)
    }
  }

  useEffect(() => {
    if (id) {
      loadCode();
    }
  }, [id])

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel className="h-[calc(100dvh-60px)] min-w-96">
          <CodeControls />
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-[calc(100dvh-60px)] min-w-96" defaultSize={50}>
          <div className="h-[48px] px-2 flex items-center">
            <Badge variant="default" >Preview</Badge>
          </div><div className="w-full h-full"><CodeRenderer /></div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default Editor
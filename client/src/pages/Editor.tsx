import CodeEditor from "@/components/CodeEditor"
import CodeControls from "@/components/CodeControls"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeRenderer from "@/components/CodeRenderer"
import { Badge } from "@/components/ui/badge"

const Editor = () => {

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
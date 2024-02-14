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
        <ResizablePanel className="h-[calc(100dvh-60px)] min-w-96 p-2">
            <CodeControls />
            <CodeEditor />
        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel className="h-[calc(100dvh-60px)] min-w-96 p-1" defaultSize={50}>
          <Badge variant="default" className="m-2 bg-green-200">Preview</Badge>
          <div className="p-2 w-full h-full"><CodeRenderer /></div>
        </ResizablePanel>
    </ResizablePanelGroup>
    </>
  )
}

export default Editor
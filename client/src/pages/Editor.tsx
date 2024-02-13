import CodeEditor from "@/components/CodeEditor"
import CodeControls from "@/components/CodeControls"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

const Editor = () => {
  return (
    <>
    <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel className="h-[calc(100dvh-60px)] min-w-96 p-1">
            <CodeControls />
            <CodeEditor />
        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel className="h-[calc(100dvh-60px)] min-w-96 p-1" defaultSize={50}>Preview</ResizablePanel>
    </ResizablePanelGroup>
    </>
  )
}

export default Editor
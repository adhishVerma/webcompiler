import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const CodeRenderer = () => {

    const htmlCode = useSelector((state:RootState) => state.compilerSlice.html);
    const cssCode = useSelector((state:RootState) => state.compilerSlice.css);
    const javascriptCode = useSelector((state:RootState) => state.compilerSlice.javascript);

    const combinedCode  = `<html>
    ${htmlCode}
    <style>
    ${cssCode}
    </style>
    <script>
    ${javascriptCode}
    </script>
    </html>
    `

    return (
        <div className="w-full h-full bg-white">
            <iframe srcDoc={combinedCode} className="w-full h-full"/>
        </div>
    )
}

export default CodeRenderer
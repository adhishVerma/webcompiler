import React from 'react';
import ReactCodeMirror from '@uiw/react-codemirror'
import { materialLight } from '@uiw/codemirror-theme-material';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useTheme } from './theme-provider';
import { loadLanguage} from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {  CompilerSliceStateType, updateCss,updateHtml, updateJavascript } from '@/redux/slices/compilerSlice';


const CodeEditor = () => {

    const currentLanguage = useSelector((state:RootState) => state.compilerSlice.currentLanguage);
    const languageName = currentLanguage;
    const code = useSelector((state:RootState) => state.compilerSlice[languageName]);

    const { theme } = useTheme();
    const [value, setValue] = React.useState(code);
    const onChange = React.useCallback((val: React.SetStateAction<string>) => {
        setValue(val);
    }, []);

    return (
        <ReactCodeMirror value={value} theme={theme === 'dark' ? dracula : materialLight} height='100dvh' extensions={[loadLanguage(currentLanguage)!]} onChange={onChange} />
    )
}

export default CodeEditor
import React from 'react';
import ReactCodeMirror from '@uiw/react-codemirror'
import { materialLight } from '@uiw/codemirror-theme-material';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useTheme } from './theme-provider';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateCode } from '@/redux/slices/compilerSlice';


const CodeEditor = () => {
    // use the value when creating a new file.

    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);
    const languageName = currentLanguage;
    const code = useSelector((state: RootState) => state.compilerSlice[languageName]);
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const [value, setValue] = React.useState(code);
    const onChange = React.useCallback((val: string) => {
        setValue(val);
        dispatch(updateCode(val));
    }, []);

    return (
        <ReactCodeMirror value={code} theme={theme === 'dark' ? dracula : materialLight} height='calc(100dvh - 60px - 48px)' extensions={[loadLanguage(currentLanguage)!]} onChange={onChange} />
    )
}

export default CodeEditor
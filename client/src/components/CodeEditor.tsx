import React from 'react';
import ReactCodeMirror from '@uiw/react-codemirror'
import { materialLight } from '@uiw/codemirror-theme-material';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useTheme } from './theme-provider';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';

const CodeEditor = () => {
    const { theme } = useTheme();
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val: React.SetStateAction<string>) => {
        console.log('val:', val);
        setValue(val);
    }, []);

    return (
        <ReactCodeMirror value={value} theme={theme === 'dark' ? dracula : materialLight} height='100dvh' extensions={[loadLanguage('javascript')!]} onChange={onChange} />
    )
}

export default CodeEditor
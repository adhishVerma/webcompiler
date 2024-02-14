import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
    html : string;
    css : string;
    javascript : string;
    currentLanguage : "html" | "css" | "javascript";
}

const initialState : CompilerSliceStateType = {
    html: "html",
    css: "css",
    javascript: "js",
    currentLanguage: "html"
}

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState: initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
            state.currentLanguage = action.payload;
        },
        updateHtml : (state, action:PayloadAction) => {
            console.log(action);
        },
        updateCss : (state, action:PayloadAction) => {
            console.log(action);
        },
        updateJavascript : (state, action:PayloadAction) => {
            console.log(action);
        }
    }
})

export default compilerSlice.reducer;
export const {updateCurrentLanguage, updateJavascript,updateCss,updateHtml} = compilerSlice.actions;
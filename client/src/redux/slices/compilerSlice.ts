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
        updateCode : (state, action: PayloadAction<string>) => {
            const code = action.payload;
            state[state.currentLanguage] = code;
        }
    }   
})

export default compilerSlice.reducer;
export const {updateCurrentLanguage, updateCode} = compilerSlice.actions;
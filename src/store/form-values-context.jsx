import { createContext } from "react";

export const FormValues = createContext({
    fonts: [],
    checkboxOptions: [],
    checkboxes : [],
    setCheckboxes: () => {},
    fontValue: '',
    setFontValue: () => {}
})
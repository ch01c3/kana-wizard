import { createSlice, configureStore } from "@reduxjs/toolkit"

const fontState = {
    fonts: ['Lato','Mochiy Pop One','Noto Sans JP'],
    fontSelected: 'Lato'
}

const checkBoxesOptions = ['Main Hiragana','Diacritics Hiragana','Yōon Hiragana','Main Katakana','Diacritics Katakana','Yōon Katakana']

const checkBoxesState = {
    checkboxesOptions: checkBoxesOptions,
    checkBoxes : checkBoxesOptions.reduce((options, option, optionIndex) => ({
        ...options,
        [option]: optionIndex === 0 ? true : false
    }),{})
}

const fontSlice = createSlice({
    name: 'fonts',
    initialState: fontState,
    reducers: {
        setFont(state, action) {
            state.fontSelected = action.payload
        }
    }
})

const checkBoxesSlice = createSlice({
    name: 'checkboxes',
    initialState: checkBoxesState,
    reducers: {
        setCheckboxes(state, action) {
            state.checkBoxes = {
                ...state.checkBoxes, 
                [action.payload]: !state.checkBoxes[action.payload]
            }
        },
        setAllCheckboxes(state, action) {
            state.checkBoxes = Object.keys(state.checkBoxes).reduce((options, option) => ({
                ...options,
                [option]: action.payload
            }), {})
        }
    }
})

const store = configureStore({
    reducer: {fonts: fontSlice.reducer, checkboxes: checkBoxesSlice.reducer}
})

export const fontActions = fontSlice.actions
export const checkBoxesActions = checkBoxesSlice.actions

export default store
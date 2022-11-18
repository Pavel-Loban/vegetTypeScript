import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "slice";



 export type SortItem = {
    name: string;
    sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
};

interface SortSliceState {
    sort: SortItem;

    searchValue: string;
};

const initialState: SortSliceState = {
    searchValue: '',
    sort: {
        name: 'popularity',
        sortProperty: 'rating',
    },
};

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort(state, action: PayloadAction<SortItem>) {
            state.sort = action.payload;
        },
        selectFilters(state, action: PayloadAction<any>) {
            state.sort = action.payload.sort;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    }
})

export const { setSort, selectFilters, setSearchValue } = sortSlice.actions;

export default sortSlice.reducer;
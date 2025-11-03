import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { IFilter } from '@/types';

const initialState: IFilter = {
    search: '',
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
});

export const { setSearch } = filterSlice.actions;
export default filterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const repoSlice = createSlice({
    name: 'repos',
    initialState:{
        repos : [],
        isLoading : false
    },
    reducers:{
        getReposFetch : (state,action)=>{
            state.isLoading = true;
            state.page = action.payload;
        },
        getRepoSucces : (state, action)=>{
            state.repos = action.payload;
            state.isLoading = false;
        },
        getRepoFailure : (state)=>{
            state.isLoading = false;
        }
    }
})


export const{getReposFetch,getRepoSucces,getRepoFailure} = repoSlice.actions;

export default repoSlice.reducer;
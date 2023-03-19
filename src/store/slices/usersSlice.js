import { createSlice } from "@reduxjs/toolkit";
import fetchUsers from "../thunks/fetchUsers";
import addUser from "../thunks/addUser";
import {removeUser} from "../thunks/removeUser";

const usersSlice = createSlice({
    name : "users",
    initialState: {
        isLoading : false,
        data:[],
        error : null 
    },
    extraReducers(builder){
         builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
            });
        builder.addCase(fetchUsers.fulfilled , (state , action )=>{
            state.isLoading = false;
             state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(addUser.pending ,(state ,action) => {
            state.isLoading = true ;

        } );
        builder.addCase(addUser.fulfilled , (state ,action) => {
            state.isLoading = false ;
            state.data.push(action.payload);
            
        });
        builder.addCase(addUser.rejected , (state ,action) => {
            state.isLoading = false;
            state.error = action.error
            
        });
        builder.addCase(removeUser.pending , (state , action) => {
            state.isLoading = true
            

        });
        builder.addCase(removeUser.fulfilled , (state , action) => {
            state.isLoading = false;
            state.data = state.data.filter((user) => {
                return user.id !== action.payload.id
            })
        });
        builder.addCase(removeUser.rejected , (state , action) => {
            state.isLoading = false;
            state.error = action.error
        });
    },
})

export const usersReducer = usersSlice.reducer;
// fetchUsers.pending === 'users/fetch/pending' 
// fetchUsers.fullfield === 'users/fetch/fullfield' 
// fetchUsers.error === 'users/fetch/error' 
//if fetchng is successfull/fullfield then whatever we returned in thunk function is going 
//to be passed in the payload of the action users/fetch/fullfield .
// if fetching failed then automatically an error object is passed in the
// action of type users/fetch/error in the field name error 
//ex { type : users/fetch/error , error : error object }
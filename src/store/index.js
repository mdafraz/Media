import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApis";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { photosApi } from "./apis/photosApis";

export const store = configureStore({
    reducer:{
        users : usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath] : photosApi.reducer
    },
    middleware:(getDefaultMiddleware) => {
        return getDefaultMiddleware()
                .concat(albumsApi.middleware)
                .concat(photosApi.middleware)
    }
}) 
setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser'
export {useFetchAlbumsQuery ,useAddAlbumMutation , useRemoveAlbumMutation} from './apis/albumsApis'
export { useFetchPhotosQuery , useAddPhotoMutation , useRemovePhotoMutation } from './apis/photosApis'
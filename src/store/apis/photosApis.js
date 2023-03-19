import { faker } from '@faker-js/faker'
import {createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const photosApi = createApi({
    reducerPath :"photos",
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:3005" 
    }),
    endpoints(builder){
        return{
            fetchPhotos : builder.query({
                //args is whatever we have provided to the query hook
                providesTags:(result , error , album)=>{
                    const tags = result.map((photo) => {
                        return {type: "Photo" , id : photo.id}
                    } )
                    tags.push({type:"AlbumPhoto" , id: album.id})
                    return tags
                },
                query : (album) => {
                    return{
                        url:"/photos",
                        params: {
                            albumID : album.id
                        },
                        method:"GET",
                    }
                }
            }),
            addPhoto:builder.mutation({
                invalidatesTags:(results , error , album)=>{
                    return [{type:"AlbumPhoto" , id:album.id}]
                },
                query : (album) => {
                    return {
                        method:"POST",
                        url:'/photos',
                        body: {
                            albumID : album.id,
                            url:faker.image.abstract(150,150,true)
                        }
                    }
                }
            }),
            removePhoto:builder.mutation({
                invalidatesTags:(results , error , photo)=>{
                    return [{type:"Photo" , id:photo.id}]
                },
                query:(photo) => {
                    return{
                        method:"DELETE",
                        url: `/photos/${photo.id}`
                    }
                }
            })
        }
    }
})

export const {  useAddPhotoMutation , useRemovePhotoMutation , useFetchPhotosQuery }  = photosApi
export {photosApi}
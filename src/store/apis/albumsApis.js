import {createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve , duration); 
    })
}


const albumsApi = createApi({
    reducerPath : 'albums',
    baseQuery : fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            //for testing purpose only
            await pause(1000)
            return fetch(...args)
        },
    }),
    endpoints(builder){
        return{
            removeAlbum: builder.mutation({
                invalidatesTags: (results , error , album)=>{
                    return [{type:"Albums" , id : album.id}]
                },
                query : (album)=>{ 
                    return {
                        method : "DELETE",
                        url: `/albums/${album.id}`
                    }
                }
            }),
            addAlbum : builder.mutation({
                //here user in invalidatestag is whatever we passed as a argument when 
                //we call addAlbum function
                invalidatesTags: (results , error ,user) => {
                    return [{type: "UsersAlbum" , id : user.id}]
                },
                query: (user) => {
                    return {
                        url : '/albums',
                        method:'POST',
                        body: {
                            userID : user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
             fetchAlbums : builder.query({
                //here user in provides tag is wahtever we passed as a argument when 
                //we call usefetchAblumQuery("!!this is the user!!!")
                providesTags: (result , error , user) => {
                    const tags = result.map((album) => {
                        return { type: "Albums" , id:album.id}
                    })
                    tags.push({type:"UsersAlbum" , id:user.id})
                    return tags;
                },
                query : (user) => {
                    return {
                        url:'/albums',
                        params:{
                            userID : user.id
                        },
                        method:'GET'

                    }
                }
            })
        }
    }
})

export const { useFetchAlbumsQuery , useAddAlbumMutation , useRemoveAlbumMutation } = albumsApi;
export  {albumsApi};
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from './Button'
import Skeleton from './Skeleton'
import PhotosListItems from "./PhotosListItems";

function PhotosList({ album }) {
    const{data , isFetching , error} = useFetchPhotosQuery(album)
    const [addPhoto , addPhototResults]  = useAddPhotoMutation();
    const handleAddPhoto = () => {
        addPhoto(album)
    }
    
    let content;
    if(isFetching){
        content = <Skeleton className="h-8 w-8" times={4}/>
    }else if(error){
        content = <div>Error Feetching Photos...</div>
    }else{
        content = data.map((photo)=>{
            return <PhotosListItems key = {photo.id} photo={photo}/>
        });
    }

     return <div>
        <div className="m-2 flex flex-row items-center justify-between ">
            <h3> Photos in {album.title}</h3>
            <Button loading={addPhototResults.isLoading} onClick={handleAddPhoto}> 
                + Add Photo
            </Button>
        </div>
        <div className=" mx-8 flex flex-row flex-wrap justify-center">
            {content}
        </div>
    </div>
  }
  
  export default PhotosList;
import { useFetchAlbumsQuery , useAddAlbumMutation , useRemoveAlbumMutation} from "../store/index"
import Skeleton from './Skeleton'
import ExpandingPanel from './ExpandingPanel'
import Button from './Button'
import AlbumsListItem from './AlbumsListItem'

function AlbumsList({user}){
    const {data , error , isFetching} = useFetchAlbumsQuery(user);
    const [addAlbum , results] = useAddAlbumMutation();
    
    const handleAddAlbum = () => {
        addAlbum(user)
    }   

    let content ;
    if(isFetching){
        content = <Skeleton className= "h-10 w-full" times={3}/>
        //className here is important otherwise skeleton will not show
    }else if(error){
        content = <div>Error Loading albums</div>
    }else{
        content = data.map((album) => {
            return <AlbumsListItem key={album.id} album = {album}/>
        } )
    }

    return <div>
        <div className="m-2 flex flex-row item-center justify-between">
        <h3 className="text-lg font-bold">Albums For {user.name}</h3>
        <Button onClick={handleAddAlbum} loading = {results.isLoading}>+ Add Album</Button>
        </div>
        <div>
            {content}
        </div>
        </div>
}

export default AlbumsList
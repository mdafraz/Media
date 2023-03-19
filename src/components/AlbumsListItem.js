import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandingPanel from "./ExpandingPanel";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from './PhotosList';

function AlbumsListItem({album}){
    const [removeAlbum , results] = useRemoveAlbumMutation();
    const handleAlbumDelete = ( ) => {
        removeAlbum(album)
    }
    const header = <>
        <Button className="mr-2" loading={results.isLoading} onClick={handleAlbumDelete}><GoTrashcan/></Button>
        {album.title}
        </>

    return <ExpandingPanel key={album.id} header={header}>
     <PhotosList album={album} />
    </ExpandingPanel>

}

export default AlbumsListItem;
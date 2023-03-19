import  { GoTrashcan } from 'react-icons/go'
import Button from './Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeUser } from '../store'
import ExpandingPanel from './ExpandingPanel'
import AlbumsList from './AlbumsList'



function UsersListItem({ user }){
    const [isDeletingUser , setIsDeletingUser] = useState(false)
    const [errorDeletingUser , setErrorDeletingUser] = useState(null)
    const dispatch = useDispatch()
    
    const handleUserDelete = () => {
        setIsDeletingUser(true)        
        dispatch(removeUser(user))
        .unwrap()
        .catch((err) => setErrorDeletingUser(err))
        .finally(() => setIsDeletingUser(false))

    }
    //we will use fragment below <></> which will help us to avoid making new div 
const header = <>
                <Button loading={isDeletingUser} onClick={handleUserDelete} className='mr-3'><GoTrashcan/></Button>
                {errorDeletingUser && "error"}
                {user.name}
              </>
    return (
        <ExpandingPanel header={header}> <AlbumsList user={user} /></ExpandingPanel>
    )
    
}

export default UsersListItem
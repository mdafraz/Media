import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import fetchUsers from "../store/thunks/fetchUsers";
import Skeleton from "./Skeleton";
import addUser from "../store/thunks/addUser";
import Button from './Button'
import UsersListItem from "./UsersListItem";


function UsersList(){

    const [isLoadingUser , setIsLoadingUser ] = useState(false);
    const [LoadingUserError , setIsLoadingUserError ] = useState(null)

    const [isCreatingUser , setIsCreatingUser ] = useState(false);
    const [creatingUserError , setCreatingUserError ] =useState(null);
 
   const dispatch = useDispatch();
   const {data} = useSelector((state)=>{
        return state.users;
    })

    useEffect(() => {
        setIsLoadingUser(true);
        dispatch(fetchUsers())
        .unwrap()
        .catch((err) => {setIsLoadingUserError(err)})
        .finally(() => { setIsLoadingUser(false)})
    } , [])


    const handleUserAdd = () => {
        setIsCreatingUser(true);
        dispatch(addUser())
        .unwrap()
        .catch((err) => {setCreatingUserError(err)})
        .finally(() => {setIsCreatingUser(false)})
    }

    let content;
    if(isLoadingUser){
        content = <Skeleton times={6} className = "h-10 w-full"/>
    } else if(LoadingUserError){
        content = <div>error</div>
    }else{
       content = data.map((user) => {
                return <UsersListItem key = {user.id} user = {user} />
                
        }
    )
    }
    return (<div>
        <div className="flex flex-row justify-between  items-center m-3">
            <h1 className=" m-2 text-xl">Users</h1>
            <Button loading={isCreatingUser} onClick = {handleUserAdd} > + Add User </Button>
            { creatingUserError && "Error creating User "}
        </div>
        {content}
        </div>
    )    
}
export default UsersList;

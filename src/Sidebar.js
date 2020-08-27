import React, { useEffect,useState } from 'react';
import "./Sidebar.css";
import {Avatar,IconButton} from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateProviderValue } from './StateProvider';
export default function Sidebar() {
    const [rooms,setRooms]=useState([]);
    const [{user},dispatch]=useStateProviderValue();
    
    useEffect(()=>{
        db.collection("rooms").onSnapshot((snapshot)=>{
            setRooms(snapshot.docs.map((doc)=>({
                id:doc.id,
                data: doc.data(),
            })))
        });
    },[]); 
    return (
        
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                    <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                    <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                </div>
           </div>
           <div className="sidebar_search">
            <SearchOutlinedIcon/>
            <input placeholder="Search" type="text"/>
           </div>
           <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                 {rooms.map(room=>(
                     <SidebarChat key={room.id} id={room.id}
                     name={room.data.name}/>
                 ))}
               
           </div>

        </div>
        
    )
}

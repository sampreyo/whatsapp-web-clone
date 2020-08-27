import React,{useEffect,useState} from 'react';
import {Avatar} from "@material-ui/core";
import "./SidebarChat.css";
import Button from '@material-ui/core/Button';
import db from './firebase';
import {Link} from 'react-router-dom';
export default function SidebarChat({name,id,addNewChat}) {
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        if(id){
            db.collection("rooms")
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot => (
              setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
        }
      }, [id]);
    
    const createChat=()=>{
        const roomname=prompt("Enter Name");
        if(roomname){
            db.collection("rooms").add({
                name:roomname
            });
        }
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat_info">
            <h2>
                {name}
            </h2>
            <p>
                {messages[0]?.message}
            </p>
            </div>
        </div>
        </Link>
    ):(
        <div>
            <Button fullWidth onClick={createChat}>
                <h1>
                Add New Chat
            </h1>
            </Button>
            </div>
        
    );
}

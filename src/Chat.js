import React, {useState,useEffect} from 'react';
import "./Chat.css";
import {Avatar,IconButton} from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from './firebase';
import {useParams} from 'react-router-dom';
import { useStateProviderValue } from './StateProvider';
import firebase from 'firebase';

export default function Chat() {
    
    const {roomId}=useParams();
    const [Input,setInput]=useState("");
    const [roomName,setRoomName]=useState("");
   const [message,setMessages]=useState([]);
    const [{user},dispatch]=useStateProviderValue();


   
    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((ss)=>
                setRoomName(ss.data().name)
            );
        
        db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot=>(setMessages(snapshot.docs.map(doc=>doc.data()))));
        }
    },[roomId]);

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log(Input);
    
         db.collection("rooms").doc(roomId).collection("messages").add({
             message:Input,
             name:user.displayName,
             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         });
    
        setInput("")
    };


    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar/>
                <div className="chat_headerInfo">
                <h5>
                    {roomName }
                </h5>
                <p>
                last seen{" "}
          {new Date(
              message[message.length - 1]?.
              timestamp?.toDate()
          ).toUTCString()}
                </p>
                </div>
                <div className="chat_headerRight">
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
            <div className="chat_body">
                
            {message.map((mes) => (
            
          <p className={`chat_message ${mes.name===user.displayName && "chat_receiver"}` }>
            <span className="chat_name">{mes.name}</span>
            {mes.message}
            <span className="chat_timestamp">
              {new Date(mes.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        
        ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                <input type="text" placeholder="type a message"
                value={Input} onChange={(e)=>{
                    setInput(e.target.value);
                    }}/>
                <button onClick={sendMessage} type="submit">
                    Send
                </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

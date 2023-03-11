import React, {useState , useContext, useRef , useEffect} from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import {useSelector} from 'react-redux';
import createdContext from '../Context/UserCreateContext';
import "./MessageForm.css";

const MessageForm = ({socket}) => {
    const {userData} = useSelector((state)=> state.userReducer);
    const context = useContext(createdContext);
    const { messages , setmessages , currRoom , privateMemberMsg}= context;

    const messageRef = useRef(null);
    
    const [message, setmessage] = useState("");

    useEffect(() => {
        messageRef.current?.scrollIntoView({behaviour:"smooth"})
    }, [messages])

    const onChange = (e)=>{
        setmessage(e.target.value);
    }

    const getFormattedDate = ()=>{
        const date = new Date();
        const year = date.getFullYear();
        let month = (1+ date.getMonth()).toString();
        month = month.length > 1 ? month : "0" + month;
        let day = (1+ date.getDate()).toString();
        day = day.length > 1 ? day : "0" + day;
        return month + "/" + day + "/" + year ;
    }

    const todayDate = getFormattedDate();

    socket?.on("room-messages",(data)=>{
        setmessages(data)
    })



    const onSubmit = (e) => {
        e.preventDefault();
        if(!message) return;
        const date = new Date();
        const minutes = date.getMinutes()<10? '0'+date.getMinutes() :date.getMinutes();
        const time = date.getHours() + ':' + minutes;
        socket.emit("room-work", currRoom , "" , {message ,currRoom , userData , time , todayDate});
        setmessage(""); 
    }



    return(<>
        
        {userData && !privateMemberMsg?._id && <div className=" alert" id='room-heading' ><b> {currRoom} room </b></div>}
                {userData && privateMemberMsg?._id && (
                    <>
                        <div className="alert"  id='room-heading'>
                            <div>
                                <b> {privateMemberMsg.name} </b> <img src={privateMemberMsg.picture} alt="member-chat-img" style={{width:30 , height:30 , borderRadius:'50%' , objectFit:'cover' ,marginRight:10 }} className="conversation-profile-pic" />
                            </div>
                        </div>
                    </>
                )}
        <div className='messageOutput'>
        
        {userData && messages.map(({_id:date , messagesByDate} , i)=>(
            <div key={i} >
                <p className='alert  text-center message-date-indicator' >{date}</p>
                {messagesByDate?.map(({content , time , from:sender} , idx)=>(
                    <div className={sender._id === userData?._id? "message" : "incoming-message" } key={idx} >
                        <div className='message-inner' >
                            <div className="d-flex align-items-center mb-3">
                                <img src={sender.picture} alt="sender-img" style={{width:30 , height:30 , borderRadius:'50%' , objectFit:'cover' ,marginRight:10 }} />
                                <p className='message-sender' > {sender._id === userData?._id ? "you": sender.name } </p>
                            </div>
                            <p className="message-content">{content}</p>
                            <p className="message-timestamp">
                                {time}
                            </p>
                        </div>         
                    </div>
                ))}
            </div>
        ))}
        <div ref={messageRef} />
          </div>
 
        <Form onSubmit={onSubmit} >
            <Row>
                <Col className='col-11 pe-2' >
                <Form.Group>
                    <Form.Control type='text' placeholder='Enter your message' onChange={onChange} value={message} ></Form.Control>
                </Form.Group>
                
                </Col>
                <Col className='col-1 p-0'>
                    <Button type='submit' variant='primary'  >
                         <i className='fas fa-paper-plane' style={{width:"2vw" , height:"2vh" }}  ></i> 
                         </Button>
                </Col>
            </Row>
        </Form>    
 
    </>) 
}


export default MessageForm;
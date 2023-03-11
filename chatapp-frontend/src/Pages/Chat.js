import React , {useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MessageForm from '../Components/MessageForm';
import Sidebar from '../Components/Sidebar';
import {useSelector , useDispatch} from "react-redux"
import { addError, authUser } from '../Redux/Action/UserAction';
import {useNavigate} from "react-router-dom";
import { io } from "socket.io-client";



let socket;

const Chat = () => {
    const {userData , error} = useSelector(state=>state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
       dispatch(authUser());

       // eslint-disable-next-line
    }, [])

    useEffect(() => {

        if(error){
          dispatch(addError("Login is required"));
          navigate("/login")
        }else{
          if(!userData) return navigate("/login")
           socket = io();
          socket.on("connect", ()=>{
            console.log("connected" , socket.id)
          })
        } 
        // eslint-disable-next-line
      }, [userData?._id ])

  
    return (<Container>
        <Row>
            <Col md={4}>
                <Sidebar socket={socket} />
            </Col>
            <Col md={8} >
                <MessageForm socket={socket} />
            </Col>
        </Row>
    </Container>)
}


export default Chat;
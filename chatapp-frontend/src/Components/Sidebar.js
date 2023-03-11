import React, { useContext, useEffect } from "react";
import { ListGroup, ListGroupItem ,Row , Col } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import createdContext from "../Context/UserCreateContext";
import { resetNotification , addNotification , addError } from "../Redux/Action/UserAction";
import "./Sidebar.css"

const Sidebar = ({socket}) => {
  const context = useContext(createdContext);
  const {
    setrooms,
    rooms,
    setcurrRoom,
    currRoom,
    setmembers,
    members,
    privateMemberMsg,
    setprivateMemberMsg,
  } = context;

  const { userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    if (userData) {
        setcurrRoom("general");
        getRooms();
        socket?.emit("room-work", "general" , "");
        socket?.emit("new-user");
    }
     // eslint-disable-next-line
}, [socket]);

  socket?.on("all-users", (payload) => {
    setmembers(payload);
  });


  const joinRoom = (room , ispublic=true) => {

    socket.emit("room-work", room, currRoom);
    setcurrRoom(room);
    // console.log(currRoom)
    if(ispublic){
      setprivateMemberMsg(null);
    }
    dispatch(resetNotification(room));

  }

  socket?.on("notifications", (room)=>{
    // console.log(room)
    // console.log("curr" , currRoom)
    if (allRooms.includes(room) && currRoom!==room )  dispatch(addNotification(userData,room))

})


  const getPvtId = (a, b)=>{
    if(a>b){
      return a + '-' + b
    }else{
      return b  + '-' + a
    }

  }
  const joinPvtMsg = (member) => {
    setprivateMemberMsg(member);
    const roomId = getPvtId(userData._id,member._id);
    setcurrRoom(roomId);
    joinRoom(roomId , false);
  }
  
  const getRooms = async () => {
    try {
      const response = await fetch(`/user/rooms`, {
                                            method: "GET",
                                            headers: { "content-type": "application/json" },
                                          });
      const data = await response.json();
      setrooms(data);
    } catch (error) {
      dispatch(addError(error?.message));
    }

  };

  let allRooms = [];
  return (
    <div>
      <h2>Availabe Rooms:</h2>
      <ListGroup  >
        {rooms.map((room, i) =>{
          allRooms.push(room)
          return (
            <ListGroupItem className="bg-transparent" onClick={()=>{joinRoom(room)}} key={i} active={room===currRoom} style={{ cursor: "pointer" }} > 
            
          {room}{" "}
          {currRoom !== room && userData?.newMessage?.[room] && <span className="badge rounded-pill bg-primary" > {userData?.newMessage?.[room]} </span>}
           </ListGroupItem>
          )
        } )}
      </ListGroup>
      <h2>Members:</h2>
      <ListGroup>
        {members && members.map((member, i) => {
          allRooms.push(getPvtId(userData?._id , member?._id))
        return (
          <ListGroupItem className="bg-transparent" key={member._id} active={privateMemberMsg?._id ===member?._id} onClick={()=>{joinPvtMsg(member)}} hidden={member?._id===userData?._id} style={{ cursor: "pointer" }}>
          <Row>
            <Col xs={2} className="member-status" >
                <img src={member.picture} alt="member-img" className="member-status-img" />
                {member.status === "online" ? <i className="fas fa-circle sidebar-online-status"></i>: <i className="fas fa-circle sidebar-offline-status" ></i> }
            </Col>
            <Col xs={9} >
              {member.name}{" "}
              {member.status=== "offline" && "(Offline)"}
            </Col>
            <Col>
            {currRoom !== getPvtId(userData?._id , member?._id) && userData?.newMessage?.[getPvtId(userData?._id , member?._id)] && <span className="badge rounded-pill bg-primary" > {userData?.newMessage?.[getPvtId(userData?._id , member?._id)]} </span>}
            </Col>
          </Row>
            
          </ListGroupItem>
        )
        })}
      </ListGroup>
      
    </div>
  );
};

export default Sidebar;

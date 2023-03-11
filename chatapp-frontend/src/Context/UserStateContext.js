import React, { useState } from "react";
import createdContext from "./UserCreateContext";

const UserStateContext = (props) => {

  const [rooms, setrooms] = useState([]);
  const [currRoom, setcurrRoom] = useState("general");
  const [members, setmembers] = useState([]);
  const [messages, setmessages] = useState([]);
  const [privateMemberMsg, setprivateMemberMsg] = useState({});
  const [newMessages, setnewMessages] = useState({});

  return (
    <createdContext.Provider
      value={{
        rooms,
        setrooms,
        currRoom,
        setcurrRoom,
        members,
        setmembers,
        messages,
        setmessages,
        privateMemberMsg,
        setprivateMemberMsg,
        newMessages,
        setnewMessages,
      }}
    >
      {props.children}
    </createdContext.Provider>
  );
};

export default UserStateContext;

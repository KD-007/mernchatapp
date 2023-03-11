

export const authUser = ()=>async (dispatch)=>{
    try {
        const response = await fetch(`/user/auth`, {
            method: "get",
            type:'cors',
            credentials:"include",
            headers:{"content-type": "application/json",}
            })
            const user = await response.json();
            dispatch({
                type:"authUser",
                payload:{
                    user:user.user,
                    error: user.error
                }
            })
        } catch (error) {
           
            dispatch({
                type:"addError",
                payload:error.response?.user?.message
            })
            
    }
}

export const userSignup = (info)=> async (dispatch)=>{
    try {
        const response = await fetch(`/user/signup`, {
            method: "post",
            credentials:"include",
            headers:{"content-type": "application/json"},
            body:JSON.stringify(info)
        })
        const user = await response.json();
        
        dispatch({
            type:"loginUser",
            payload:{
                    error: user.message,
                    user: user.user
                }
        })
    } catch (error) {
        // console.log("Error in signup");
        dispatch({
            type:"addError",
            payload:error.response?.user?.message
        })
        
    }
}


export const userLogin = (info)=> async (dispatch)=>{
    try {
        const response = await fetch(`/user/login`, {
            method: "post",
            credentials:"include",
            headers:{"content-type": "application/json"},
            body:JSON.stringify(info)
        })
        const user = await response.json();

        dispatch({
            type:"loginUser",
            payload:{
                    error: user.message,
                    user: user.user
                }
        })
    } catch (error) {
        // console.log("Error in login");
        dispatch({
            type:"addError",
            payload:error.response?.user?.message
        })
        
    }
}

export const userLogout = (userData)=> async (dispatch)=>{
    try {
       
        await fetch(`/user/logout`, {
            method: "delete",
            credentials:"include",
            headers:{"content-type": "application/json"},
            body:JSON.stringify(userData)
        }) 
        dispatch({
            type:"logoutUser",
        })
    } catch (error) {
        // console.log("Error in login");
        dispatch({
            type:"addError",
            payload:error.response?.user?.message
        })
        
    }
}


export const addNotification = (userData , room)=> async (dispatch)=>{
    try {
        if(userData?.newMessage[room]){
            dispatch({
                type:"addNotification",
                payload:{
                    value:userData.newMessage[room]+1,
                    room:room
                }
            })
        }else{
            dispatch({
                type:"addNotification",
                payload:{
                    room: room,
                    value:1
                }
            })
        }
        
    } catch (error) {
        dispatch({
            type:"addError",
            payload:error?.message
        })
    }
}

export const resetNotification = (room)=> async (dispatch)=>{
    try {
            dispatch({
                type:"resetNotification",
                payload:{
                    room: room,
                }
            })
   
    } catch (error) {
        dispatch({
            type:"addError",
            payload:error?.message
        })
    }
}

export const addError = (msg)=> async (dispatch)=>{
    dispatch({
        type:"addError",
        payload:msg
    })
}

export const clearError = () => async(dispatch)=>{
    dispatch({
        type:"clearError"
    })
}


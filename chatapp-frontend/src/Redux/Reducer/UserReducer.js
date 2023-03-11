import {createReducer} from "@reduxjs/toolkit";


var initialData  = {};

export const userReducer = createReducer(initialData, {
    signupUser: (state , action)=>{
        state.error= action.payload.error
        state.userData=action.payload.user
    },
    loginUser: (state , action)=>{
        state.error= action.payload.error
        state.userData=action.payload.user
    },
    logoutUser: (state , action)=>{
        state.userData=null
    },
    addNotification: (state, action)=>{
        state.userData.newMessage[action.payload.room]=action.payload.value
    },
    resetNotification: (state, action)=>{
        delete state.userData.newMessage[action.payload.room];
    },
    clearError: (state, action)=>{
        delete state.error
    },
    addError: (state, action)=>{
        state.error=action.payload
    },
    authUser: (state, action)=>{
        state.userData=action.payload.user
    }
})
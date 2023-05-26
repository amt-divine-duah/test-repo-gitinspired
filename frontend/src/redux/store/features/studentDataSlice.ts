import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode, useState } from "react";
import axios from "axios";

export interface User {
    id:number;
    name:string;
    email:string;
}

interface UsersState{
    users:User[]
}

const initialState:UsersState={
    users:[]
};




export const PersonSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        usersData:(state,action:PayloadAction<{data: ReactNode}>)=>{
                
        }
    }
})
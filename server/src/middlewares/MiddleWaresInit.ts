import { morgan_mid, session_mid } from "./"
import express , { Express } from "express";

export const AppMiddleWaresInit = (app : Express)=>{
    app.use([
        morgan_mid,
        session_mid,
        express.json()
    ])
}
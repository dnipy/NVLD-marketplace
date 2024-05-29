import session ,  { MemoryStore } from "express-session"

var memoryStore = new MemoryStore();                       
export const session_mid = session({
    secret:'BeALongSecret',                         
    resave: false,                         
    saveUninitialized: true,                         
    store: memoryStore                       
})
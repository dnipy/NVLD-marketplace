import { Request, Response } from "express";

export type NodeEnvType = "development" | "production"

export interface I_Request_Custom extends Request {

}

export interface I_Response_Custom extends Response {

}
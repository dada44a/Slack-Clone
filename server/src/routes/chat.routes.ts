import { Hono } from "hono";
import { getStreamToken } from "../controller/chat.controller.js";
const chatRoutes = new Hono();

chatRoutes.get('/token', getStreamToken);


export default chatRoutes;

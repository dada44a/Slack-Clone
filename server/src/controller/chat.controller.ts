import { generateUserToken } from "../stream/index.js";

export const getStreamToken = async (c: any) => {
    try{
        const token = generateUserToken(c.auth.userId);
        return c.json({ token });
    } catch (error) {
        console.error("Error generating Stream token:", error);
        return c.json({ error: "Internal Server Error" }, 500);
    }
}
import { StreamChat } from 'stream-chat';
import 'dotenv/config';

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
    throw new Error('Stream API key and secret must be set in environment variables');
}

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);


export const upsertStreamUser = async (userData: any) => {
    try {
        await serverClient.upsertUser(userData);
        console.log(`Successfully upserted user with id: ${userData.id}`);
    }
    catch (err) {
        console.error('Error upserting user:', err);
    }
}

export const deleteStreamUser = async (userId: any) => {
    try {
        await serverClient.deleteUser(userId);
        console.log(`Successfully deleted user with id: ${userId}`);
    }
    catch (err) {
        console.error('Error deleting user:', err);
    }
}

export const generateUserToken = (userId: string) => {
    try {
        if (!userId) throw new Error('User ID is required to generate token');

        return serverClient.createToken(userId);
    }
    catch (err) {
        console.error('Error generating user token:', err);
    }

}


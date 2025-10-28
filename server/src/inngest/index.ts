import { Inngest } from "inngest";
import { connectDb } from "../db/connect.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack_clone" });

const syncUserProfile = inngest.createFunction(
    { id: "sync_user_profile" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        console.log("🔔 Inngest function triggered", event.name, event.data);
        // const { id, email_addresses, first_name, last_name, image_url } = event.data;
        // const newUser = {
        //     clerkId: id,
        //     email: email_addresses[0].email_address,
        //     name: `${first_name} ${last_name}`,
        //     image: image_url,
        // };
        // try {
        //     let db = connectDb();
        //     await db.insert(usersTable).values(newUser);
        // } catch (error) {
        //     console.error("Error inserting user into database:", error);
        //     throw error;
        // }
    });


const deleteUserProfile = inngest.createFunction(
    { id: "delete_user_profile" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        console.log("🔔 Inngest function triggered", event.name, event.data);
        // const { id } = event.data;
        // try {
        //     let db = connectDb();
        //     await db.delete(usersTable).where(eq(usersTable.clerkId, id));
        // } catch (error) {
        //     console.error("Error deleting user from database:", error);
        //     throw error;
        // }
    });

// Export the functions to be used in the server
export const functions = [syncUserProfile, deleteUserProfile];

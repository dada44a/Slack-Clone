import { Inngest } from "inngest";
import { connectDb } from "../db/connect.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { deleteStreamUser, upsertStreamUser } from "../stream/index.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack_clone" });

const syncUserProfile = inngest.createFunction(
    { id: "sync_user_profile" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        
        const { id, email_addresses, first_name, last_name, image_url } = event.data;
        const newUser = {
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            image: image_url,
        };
        try {
            let db = connectDb();
           const result = await db.insert(usersTable).values(newUser).returning();
              console.log("User inserted with ID:", result);
              await upsertStreamUser({
                id: newUser.clerkId as string,
                name: newUser.name,
                email: newUser.email,
                image: newUser.image,
              })
        } catch (error) {
            console.error("Error inserting user into database:", error);
            throw error;
        }
    });


const deleteUserProfile = inngest.createFunction(
    { id: "delete_user_profile" },
    { event: "clerk/user.deleted" },
    async ({ event, step }) => {
        const { id } = event.data;
        try {
            let db = connectDb();
            await db.delete(usersTable).where(eq(usersTable.clerkId, id)).returning();
            await deleteStreamUser(id.toString());
        } catch (error) {
            console.error("Error deleting user from database:", error);
            throw error;
        }
    });

// Export the functions to be used in the server
export const functions = [syncUserProfile, deleteUserProfile];

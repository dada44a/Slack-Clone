import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { serve as inngestServe } from "inngest/hono";
import { inngest, functions } from "./inngest/index.js";




const app = new Hono();
app.use("*", clerkMiddleware());
app.use("/api/inngest", inngestServe({ client: inngest, functions }));


app.get('/', async (c) => {
  return c.text('Hello Hono with Drizzle + Neon!');
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

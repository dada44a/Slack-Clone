import '../instrument.js'
import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import { serve as inngestServe } from "inngest/hono";
import { inngest, functions } from "./inngest/index.js";
import { cors } from 'hono/cors';
import chatRoutes from './routes/chat.routes.js';
import * as Sentry from "@sentry/node";

const app = new Hono();


app.use("*",cors());
app.use("*", clerkMiddleware());

app.get('/', async (c) => {
  return c.text('Hello Hono with Drizzle + Neon!');
});

app.get("/debug-sentry", async (c) => {
  throw new Error("Sentry debug error!");
});

app.use("/api/inngest", inngestServe({ client: inngest, functions }));
app.route('/api/chat', chatRoutes);

Sentry.setupHonoErrorHandler(app);

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

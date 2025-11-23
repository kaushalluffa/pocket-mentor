import { Account, Client, ID, TablesDB } from "node-appwrite";

// NOTE: This module is server-only. It uses the Appwrite admin API key
// (process.env.APPWRITE_API_KEY) and must not be imported from client-side
// code. Keep any admin-level Appwrite operations behind server routes
// or server-only actions (e.g. Next.js "use server" functions).
const createAdminClient = () => {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const project = process.env.APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!endpoint || !project || !apiKey) {
    throw new Error("Appwrite environment variables are not properly set.");
  }
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(apiKey);

  const account = new Account(client);
  const databases = new TablesDB(client);
  return {
    get account() {
      return account;
    },
    get databases() {
      return databases;
    },
  };
};

const createSessionClient = (sessionId?: string) => {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const project = process.env.APPWRITE_PROJECT_ID;

  if (!endpoint || !project) {
    throw new Error("Appwrite environment variables are not properly set.");
  }
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project);
  if (sessionId) {
    client.setSession(sessionId);
  }
  const account = new Account(client);
  const databases = new TablesDB(client);
  return {
    get account() {
      return account;
    },
    get databases() {
      return databases;
    },
  };
};

export { createAdminClient, createSessionClient, ID };

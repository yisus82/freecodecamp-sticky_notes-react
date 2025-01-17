import { Client, Databases } from 'appwrite';
import { DBCollection } from '../types/app';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);

const collections: DBCollection[] = [
  {
    name: 'notes',
    id: import.meta.env.VITE_COLLECTION_NOTES_ID,
    dbId: import.meta.env.VITE_DATABASE_ID,
  },
];

export { client, collections, databases };

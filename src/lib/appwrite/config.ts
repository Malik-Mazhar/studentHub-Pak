import { Client, Account, Databases, Storage } from 'appwrite';
import types from '../../types/env'

export const client = new Client();

client
    .setEndpoint(types.appwrite.endPoint)
    .setProject(types.appwrite.projectId); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';

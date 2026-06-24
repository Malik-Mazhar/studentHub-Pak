import { databases } from "./config";
import types from '../../types/env'

const DATABASE_ID = types.appwrite.databaseId!;
const COLLECTION_ID = types.appwrite.collectionId!;

export const createPost = async (data: any) => {
  return await databases.createDocument({
    databaseId: DATABASE_ID,       // mandatory
    collectionId: COLLECTION_ID,   // mandatory
    documentId: "unique()",         // mandatory
    data: data,                    // mandatory, your post object
    permissions: ["read('any')", "write('any')"], // optional
  });
};

export const getPosts = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID
  );
};
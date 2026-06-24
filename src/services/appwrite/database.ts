"use client"
import { account, databases } from "./config";
import types from '../../types/env'
import { ID, Permission, Role } from 'appwrite'
import { userDataType, userPostType } from "@/src/types/dataTaype";
import { store } from '../../store/store'

const DATABASE_ID = types.appwrite.databaseId!;
const COLLECTION_ID = types.appwrite.collectionId!;
const USERPOST_COLLECTION_ID = types.appwrite.createPostCollectionId

// export const waitForUser = () => {
//   return new Promise((resolve) => {
//     const check = () => {
//       const user = store.getState().auth?.user;

//       if (user) {
//         resolve(user.$id);
//         return true;
//       }
//       return false;
//     };

//     if (check()) return;

//     const interval = setInterval(() => {
//       if (check()) clearInterval(interval);
//     }, 50);
//   });
// };



export const createUserProfile = async (data: userDataType, fileId?: string | null) => {
  const user = await account.get();

  return await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    {
      ...data,
      profileImg: fileId || null
    },
    [
      Permission.read(Role.any()),            // sab log dekh sakte hain
      Permission.update(Role.user(user.$id)), // sirf owner update
      Permission.delete(Role.user(user.$id))  // sirf owner delete
    ]
  );
};

export const createUserPost = async (data: userPostType) => {
  const user = await account.get();
  await databases.createDocument(
    DATABASE_ID,
    USERPOST_COLLECTION_ID,
    ID.unique(),
    data,
    [
      Permission.create(Role.user(user.$id)),
      Permission.read(Role.users()),
      Permission.update(Role.user(user.$id)),
      Permission.delete(Role.user(user.$id)),
    ]
  )
}

export const getPosts = async () => {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID
  );
};


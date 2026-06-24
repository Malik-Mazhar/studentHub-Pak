import { account, ID, storage } from "./config";
import types from '../../types/env'
import { Permission, Role } from "appwrite";

const BUCKET_ID = types.appwrite.bucketId 

export const createImg = async (file: File) => {
    const res = await storage.createFile(
        BUCKET_ID,
        ID.unique(), 
        file,
         [
            Permission.read(Role.any())
        ]
    ); 
    return res
};

export const getImgView = (fileId: string) => {
    return storage.getFileView(
        BUCKET_ID,
        fileId
    )
};
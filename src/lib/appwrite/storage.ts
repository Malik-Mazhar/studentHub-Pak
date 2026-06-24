import { storage } from "./config";
import types from '../../types/env'

const BUCKET_ID = types.appwrite.bucketId 

export const bucketId = async (file: File) => {
    return await storage.createFile(BUCKET_ID, "unique()", file)
}
const env = {
    appwrite: {
        endPoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apiKey: String(process.env.APPWRITE_API_KEY),
        databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
        collectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
        bucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID)
    }
};

export default env;
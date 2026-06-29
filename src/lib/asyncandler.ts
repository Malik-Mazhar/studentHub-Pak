import { ApiError } from "./apiError";

export function asyncHandler( handler: (req: Request) => Promise<Response> ) {
    
  return async (req: Request): Promise<Response> => {
    try {
      
      return await handler(req);

    } catch (error: any) {
      console.error(typeof error);

     const statusCode = error?.statusCode || 500;
      const message = error?.message || "Internal Server Error";

      return Response.json(
      {
        success: false,
        message: message,
      },
      { status: statusCode }
    );

    }
  };
}
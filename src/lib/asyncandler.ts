import { ApiError } from "./apiError";

export function asyncHandler( handler: (req: Request) => Promise<Response> ) {
    
  return async (req: Request): Promise<Response> => {
    try {
      
      return await handler(req);

    } catch (error) {
      console.error(typeof error);

      if (error instanceof ApiError) {
        return Response.json(
          {
            success: false,
            message: error.message,
          },
          { status: error.statusCode }
        );
      };

      return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );

    }
  };
}
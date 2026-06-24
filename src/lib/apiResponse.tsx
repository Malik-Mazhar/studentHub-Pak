class ApiResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data: any;

    constructor(statusCode: number, data: any, message= "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400
    }
};

export {
    ApiResponse
}
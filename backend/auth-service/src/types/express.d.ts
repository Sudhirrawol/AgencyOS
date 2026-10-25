declare global {
    namespace Express {
        interface Userpayload {
            userId: string,
        }
        interface Request {
            user?: UserPayload;
        }
    }
}

export {}
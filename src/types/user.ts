export interface IUser {
    username: string;
    email: string;
    role: string;
    photoURL: string;
    isBlocked: boolean;
    status: string;
    phoneNumber: string;
    iat?: number;
    exp?: number;
}
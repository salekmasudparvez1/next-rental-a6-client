export interface IUser {
    id: string;
    email: string;
    role: string;
    isBlocked: boolean;
    isActive: boolean;
    subscriptionPlan: string;
    status: string;
    photoURL: string;
    iat?: number;
    exp?: number;
}

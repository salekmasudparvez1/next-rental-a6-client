export interface IUser {
    id: string;
    email: string;
    role: string;
    username: string;
    phoneNumber: number;
    isBlocked: boolean;
    isActive: boolean;
    subscriptionPlan: string;
    status: string;
    photoURL: string;
    iat?: number;
    exp?: number;
}
export interface IUserForTable {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: 'admin' | 'landlord' | 'tenant';
    isBlocked: boolean;
    isActive: boolean;
    photoURL: string;
    status: 'pending' | 'approved' | 'rejected';
    subscriptionPlan: 'free' | 'premium';
    createdAt?: string;
    updatedAt?: string;
}
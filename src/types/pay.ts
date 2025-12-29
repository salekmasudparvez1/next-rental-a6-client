import { RentalHouseFormData } from "@/components/module/create-post/post.validation";
import { IUser } from "./user";

export interface ITransaction {
    _id?: string
    transactionId?: string;
    currency?: string;
    amountCents?: number;
    amount?: number;
    paymentMethod?: string;
    paymentStatus: { status: "failed" | "success"; message?: string };
    requestId?: {

        tenantId: IUser;
        rentalHouseId: RentalHouseFormData;
        landloardId: IUser;
        status: 'pending' | 'approve' | 'reject';
        date: {
            from: Date;
            to: Date;
        },
        createdAt: Date;
        updatedAt: Date;
        _id: string;
    },
    createdAt?: Date;
    updatedAt?: Date;
    paymentIntentId?: string;


}

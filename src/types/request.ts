import { RentalHouseFormData } from "@/components/module/create-post/post.validation";



interface IUser {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "landlord" | "tenant";
  isBlocked: boolean;
  isActive: boolean;
  photoURL: string;
  status: "pending" | "approved" | "rejected";
  subscriptionPlan: "free" | "premium";
  updatedAt: string;
  crreatedAt: string;
}


export interface IRequestOfLandlord{
  tenantId: IUser;
  rentalHouseId: RentalHouseFormData; 
  landloardId: string; 
  status:  'pending' | 'approve' | 'reject';
  date:{
    from:Date;
    to:Date;
  },
  createdAt:Date;
  updatedAt:Date;
  _id:string;
}
export interface IRequestOfTenant{
  tenantId: string;
  rentalHouseId: RentalHouseFormData; 
  landloardId: IUser; 
  status: 'pending' | 'approve' | 'reject';
  date:{
    from:Date;
    to:Date;
  },
  createdAt:Date;
  updatedAt:Date;
  _id:string;
}

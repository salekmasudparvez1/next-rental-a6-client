export interface IFeature {
  name: string;
  color: string;
}
export interface Ilandloard {
  _id?:string
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
  role: 'admin' | 'landlord' | 'tenant';
  isBlocked: boolean;
  isActive: boolean;
  photoURL: string;
  status: 'pending' | 'approved' | 'rejected';
  subscriptionPlan: 'free' | 'premium';
  createdAt?:Date,
  updatedAt?:Date
}
export interface IComment {
  userId: string;
  comment: string;
  rating: number;
}

export interface RentalHouseFormData {
  _id?: string;
  title: string;
  description: string;
  landloardId?:Ilandloard | string;
  landloardDetails?:Ilandloard;
  location: {
    division: string;
    district: string;
    subDistrict: string
    streetAddress: string;
    map: {
      lat: number;
      lng: number;
    }
  }
  status: "available" | "rented" | "maintenance"
  rentAmount: number;
  bedroomNumber: number;
  features?: IFeature[];
  comments?: IComment[];
  images?: string[] | undefined;
}

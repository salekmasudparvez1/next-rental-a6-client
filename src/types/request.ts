export interface IRequestOfTenant{
  tenantId: string;
  rentalHouseId: string; 
  landloardId: string; 
  status: 'pending' | 'approve' | 'reject';
  date:{
    from:Date;
    to:Date;
  },
  createdAt:Date;
  updatedAt:Date;
  _id:string;
}

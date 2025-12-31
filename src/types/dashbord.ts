export interface ILandlordDashboardInfo {
  totalProperties: number;   // Total rental houses of this landlord
  occupiedHouses: number;    // Houses with status "rented"
  vacantHouses: number;      // Houses with status "available"
  monthlyIncome: number;     // Sum of successful transactions for this month
}

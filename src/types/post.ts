export interface IFeature {
  name: string;
  color: string;
}

export interface RentalHouseFormData {
  title: string
  description: string
  location: {
    division: string
    district: string
    subDistrict: string
    streetAddress: string
    map: {
      lat: number
      lng: number
    }
  }
  status: "available" | "rented" | "maintenance"
  rentAmount: number
  bedroomNumber: number
  features?: IFeature[]
  images?: string[] | undefined
}
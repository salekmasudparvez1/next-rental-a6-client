export interface Union {
  name: string;
}

export interface TUpazila {
  name: string;
  unions?: Union[] | string[];
}

export interface TDistrict {
  name: string;
  upazilas?: TUpazila[] | string[];
}

export interface TDivision {
  name: string;
  districts?: TDistrict[];
}

export interface TOptionsOfCombo {
  label:string;
  value:string
}


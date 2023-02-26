// For plan data
export interface IPlan {
  id: string;
  imageUrl?: null;
  name?: string;
  description: string;
  numberOfAudiences: number;
  numberOfDatasets?: number;
  numberOfMembers: number;
  numberOfSurveys: number;
  price: string;
  createAt?: string;
  updateAt?: string;
  mostPopular?: boolean;
  onClick: any;
}

// For point data
export interface IRewards {
  id?: string;
  type?: string;
  point?: string;
  createdAt?: string;
  updatedAt?: string;
}

// For researcher data
export interface IResearcher {
  id: string;
  email?: string;
  fullName?: string;
  role?: string;
  lastLogin: any | null;
  status: string;
  verificationCode: string;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface IResearcherData {
  data: IResearcher[]
  totalPages: number
  total: number
}

// For respondent data
export interface IRespondent {
  id: string;
  email?: string;
  fullName?: string;
  role?: string;
  verificationCode: string;
  status: string;
}

export interface IRespondentData {
  data: IRespondent[]
  totalPages: number
  total: number
}

//  For survey data
export interface ISurveyLists {
  description: string;
  id?: number;
  title?: string;
  quota: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  tokenReward: number;
  startDate?: string;
  adminFee: number;
  APR: number;
}

export interface ISurveyData {
  data: ISurveyLists[]
  totalPages: number
  total: number
}

// Form Element
export interface IFormInput {
  name: string;
  value?: number | string;
  type?: string;
  placeholder?: string;
  label?: string;
  classDiv?: string;
  className?: string;
  disabled?: boolean;
  onChange?: any;
  onBlur?: any;
  onKeyUp?: any;
  onKeyDown?: any;
  containerClass?: string;
}

export interface IDropdown extends IFormInput {
objects: IFormDropdownValue[];
  onSelected?: any;
}

export interface IFormDropdownValue {
  label: string
  value: number | string
  disabled?: boolean
}


// Vendors
export type VendorDataType = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  logo?: string;
};

// Coupons
export type CouponsDataType = {
  id: string
  couponCode: string
  isUsed: boolean
  createdAt: string
  updatedAt: string
}

export interface ICoupons {
  id: string
  couponName: string
  couponDesc: string
  couponImageUrl: string
  couponExpiredAt: string
  couponPrice: number
  couponTerm: string
  createdAt: string
  updatedAt: string
  couponCode: CouponsDataType[]
  vendor: VendorDataType[]
}

// Analytics
export interface IAnalytics {
  respondent: number;
  researcher: number;
  survey: number;
  response: number;
  pointEarned: number;
  pointUsed: number;
  userInvited: number;
  userVerified: number;
  userPending: number;
}

// Referrals
export interface IReferrals {
  userInviter_id: string
  userInviter_email: string
  userInviter_fullName: string
  userInviter_referralCode: string
  userInviter_createdAt: string
  invitedcount: string
}

// Purchases
export interface IPurchases {
  planName: string
  amount: number
  salesTax: number
  transId: string
}


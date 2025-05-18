export interface PointMetadata {
  note?: string;
}

export interface ItemMetadata {
  itemCode: string;
  expireDate?: string;
}

export interface CouponMetadata {
  couponId: string;
  validDays?: number;
}

export type RewardMetadata = PointMetadata | ItemMetadata | CouponMetadata;

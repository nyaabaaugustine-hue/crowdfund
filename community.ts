export interface Community {
  id: string;
  name: string;
  category: 'Alumni' | 'Church' | 'Professional';
  memberCount: string;
  campaignCount: number;
  raisedAmount: string;
  region: string;
  description?: string;
  imageUrl?: string;
}
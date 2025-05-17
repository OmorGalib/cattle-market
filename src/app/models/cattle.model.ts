export interface CattleModel {
  id: number;
  breed: string;
  weight: number;
  price: number;
  status: 'available' | 'sold';
}

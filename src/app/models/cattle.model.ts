export interface Cattle {
  id: number;
  breed: string;
  weight: number;
  price: number;
  status: 'available' | 'sold';
}

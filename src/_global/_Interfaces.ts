export interface Categories {
  id: number;
  name: string;
  imageUrl: string;
}
export interface ShopData {
  title: string;
  items: {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

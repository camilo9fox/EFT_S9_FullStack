export interface Product {
  id: number;
  description: string;
  name: string;
  stock: number;
  author: string;
  category: string;
  price: number;
  image: string;
  cantidad?: number;
}

export interface User {
  email: string;
  password: string;
  type: 'admin' | 'customer';
  name: string;
  lastName: string;
  address: string;
}

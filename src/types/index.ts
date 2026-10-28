export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: 'gift-boxes' | 'art-pieces' | 'accessories' | 'home-decor' | 'candles';
  image: string;
  additionalImages?: string[];
  badge?: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  materials: string[];
  dimensions?: string;
  leadTime?: string;
  customizable?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  personalizationNote?: string;
}

export interface OrderDetails {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerNote?: string;
  pinCode?: string;
  recipientName?: string;
}

import { CartItem, Product } from '../types/index.ts';

export const WHATSAPP_NUMBER = '919448620389';
export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_FEE = 60;

export interface CartTotals {
  itemsCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  isFreeShipping: boolean;
  amountNeededForFreeShipping: number;
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shipping = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shipping;
  const amountNeededForFreeShipping = isFreeShipping ? 0 : FREE_SHIPPING_THRESHOLD - subtotal;

  return {
    itemsCount,
    subtotal,
    shipping,
    total,
    isFreeShipping,
    amountNeededForFreeShipping,
  };
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function generateWhatsAppOrderUrl(
  phone: string,
  items: CartItem[],
  options?: {
    customerName?: string;
    pinCode?: string;
    customNote?: string;
  }
): string {
  if (items.length === 0) {
    return `https://wa.me/${phone}`;
  }

  const totals = calculateCartTotals(items);
  let message = "Hello Luxelegacy! I'd like to place an order:\n\n";

  items.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    message += `${item.product.name} x ${item.quantity} = ${formatCurrency(itemTotal)}\n`;
    if (item.personalizationNote && item.personalizationNote.trim()) {
      message += `   ↳ Note/Personalization: "${item.personalizationNote.trim()}"\n`;
    }
  });

  message += `\nSubtotal: ${formatCurrency(totals.subtotal)}\n`;
  if (totals.shipping > 0) {
    message += `Shipping: ${formatCurrency(totals.shipping)}\n`;
  } else {
    message += `Shipping: FREE\n`;
  }
  message += `Total: ${formatCurrency(totals.total)}\n\n`;

  if (options?.customerName && options.customerName.trim()) {
    message += `Customer Name: ${options.customerName.trim()}\n`;
  }
  if (options?.pinCode && options.pinCode.trim()) {
    message += `Delivery PIN Code: ${options.pinCode.trim()}\n`;
  }
  if (options?.customNote && options.customNote.trim()) {
    message += `Special Request: ${options.customNote.trim()}\n`;
  }

  message += "\nPlease confirm availability and delivery details.";

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppInquiryUrl(
  phone: string,
  product: Product,
  customMessage?: string
): string {
  let message = `Hello Luxelegacy! I'm interested in the "${product.name}" (${formatCurrency(product.price)}).\n\n`;
  if (customMessage && customMessage.trim()) {
    message += `Query: ${customMessage.trim()}\n\n`;
  }
  message += "Could you please share more details regarding availability and delivery?";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function validatePinCode(pin: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pin.trim());
}

export function estimateDeliveryDays(pinCode: string): string | null {
  if (!validatePinCode(pinCode)) return null;
  const firstDigit = pinCode.charAt(0);
  // Realistic regional estimates based on Indian postal zones
  switch (firstDigit) {
    case '5':
    case '6':
      return '2-3 Business Days (South Zone)';
    case '4':
      return '3-4 Business Days (West Zone)';
    case '1':
    case '2':
      return '4-5 Business Days (North Zone)';
    case '7':
    case '8':
      return '4-6 Business Days (East & Central Zone)';
    default:
      return '3-5 Business Days';
  }
}

export function filterProducts(
  products: Product[],
  query: string,
  category: string,
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating'
): Product[] {
  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.some(m => m.toLowerCase().includes(q))
    );
  }

  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // featured - keep original order
      break;
  }

  return filtered;
}

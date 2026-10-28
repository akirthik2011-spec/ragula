import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  formatCurrency,
  generateWhatsAppOrderUrl,
  validatePinCode,
  estimateDeliveryDays,
  filterProducts,
  WHATSAPP_NUMBER,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from './cartLogic.ts';
import { Product, CartItem } from '../types/index.ts';

const mockProductA: Product = {
  id: 1,
  name: 'Handmade Gift Box',
  description: 'A thoughtful gift for someone special.',
  longDescription: 'Curated wooden box with natural finish.',
  price: 499,
  category: 'gift-boxes',
  image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48',
  inStock: true,
  rating: 4.9,
  reviewsCount: 38,
  materials: ['Pine Wood', 'Silk Ribbon'],
};

const mockProductB: Product = {
  id: 2,
  name: 'Creative Art Piece',
  description: 'A unique piece to brighten your space.',
  longDescription: 'Hand-painted canvas textured with gold leaf.',
  price: 699,
  category: 'art-pieces',
  image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
  inStock: true,
  rating: 4.8,
  reviewsCount: 24,
  materials: ['Canvas', 'Acrylic', 'Gold Leaf'],
};

test('formatCurrency formats Indian Rupee correctly', () => {
  assert.equal(formatCurrency(499), '₹499');
  assert.equal(formatCurrency(1249), '₹1,249');
  assert.equal(formatCurrency(0), '₹0');
});

test('calculateCartTotals calculates subtotals and shipping under threshold', () => {
  const items: CartItem[] = [{ product: mockProductA, quantity: 1 }];
  const totals = calculateCartTotals(items);

  assert.equal(totals.itemsCount, 1);
  assert.equal(totals.subtotal, 499);
  assert.equal(totals.shipping, STANDARD_SHIPPING_FEE);
  assert.equal(totals.total, 499 + STANDARD_SHIPPING_FEE);
  assert.equal(totals.isFreeShipping, false);
  assert.equal(totals.amountNeededForFreeShipping, FREE_SHIPPING_THRESHOLD - 499);
});

test('calculateCartTotals applies free shipping over threshold', () => {
  const items: CartItem[] = [
    { product: mockProductA, quantity: 1 }, // 499
    { product: mockProductB, quantity: 1 }, // 699 = 1198 total
  ];
  const totals = calculateCartTotals(items);

  assert.equal(totals.itemsCount, 2);
  assert.equal(totals.subtotal, 1198);
  assert.equal(totals.shipping, 0);
  assert.equal(totals.total, 1198);
  assert.equal(totals.isFreeShipping, true);
  assert.equal(totals.amountNeededForFreeShipping, 0);
});

test('generateWhatsAppOrderUrl builds expected wa.me URL with order breakdown', () => {
  const items: CartItem[] = [
    { product: mockProductA, quantity: 2, personalizationNote: 'For Ananya' },
  ];
  const url = generateWhatsAppOrderUrl(WHATSAPP_NUMBER, items, {
    customerName: 'Kavita',
    pinCode: '560001',
  });

  assert.match(url, new RegExp(`^https://wa\\.me/${WHATSAPP_NUMBER}\\?text=`));
  const decoded = decodeURIComponent(url.split('?text=')[1]);

  assert.match(decoded, /Hello Luxelegacy! I'd like to place an order:/);
  assert.match(decoded, /Handmade Gift Box x 2 = ₹998/);
  assert.match(decoded, /Note\/Personalization: "For Ananya"/);
  assert.match(decoded, /Customer Name: Kavita/);
  assert.match(decoded, /Delivery PIN Code: 560001/);
});

test('validatePinCode correctly validates 6-digit Indian PIN codes', () => {
  assert.equal(validatePinCode('560001'), true);
  assert.equal(validatePinCode('110001'), true);
  assert.equal(validatePinCode('010001'), false); // starting with 0 is invalid
  assert.equal(validatePinCode('12345'), false); // too short
  assert.equal(validatePinCode('ABCDE1'), false); // letters
});

test('estimateDeliveryDays provides regional shipping windows', () => {
  assert.equal(estimateDeliveryDays('560001')?.includes('South Zone'), true);
  assert.equal(estimateDeliveryDays('110001')?.includes('North Zone'), true);
  assert.equal(estimateDeliveryDays('invalid'), null);
});

test('filterProducts filters by category and search term correctly', () => {
  const products = [mockProductA, mockProductB];
  
  const giftBoxes = filterProducts(products, '', 'gift-boxes', 'featured');
  assert.equal(giftBoxes.length, 1);
  assert.equal(giftBoxes[0].id, 1);

  const searched = filterProducts(products, 'canvas', 'all', 'featured');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 2);

  const priceSorted = filterProducts(products, '', 'all', 'price-desc');
  assert.equal(priceSorted[0].price, 699);
  assert.equal(priceSorted[1].price, 499);
});

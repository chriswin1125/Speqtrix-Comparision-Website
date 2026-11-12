/**
 * Utility to format numerical amounts into Indian Rupees (INR) format.
 * If a raw legacy USD amount is passed (e.g. 1299 for a phone or 3499 for a laptop),
 * it converts it dynamically using the current exchange rate (~86.5 INR/USD)
 * so it never erroneously displays small USD values like "₹1,299".
 */
export function formatINR(amount, priceINR, currency) {
  if (priceINR && Number(priceINR) > 0) {
    return `₹${Number(priceINR).toLocaleString('en-IN')}`;
  }
  let num = Number(amount || 0);
  if (isNaN(num) || num <= 0) return '₹0';

  // If the number is clearly a raw USD price (less than 4,500 for electronics or marked as USD)
  if (currency === 'USD' || (num > 0 && num < 4500)) {
    num = Math.round(num * 86.5);
  }

  return `₹${num.toLocaleString('en-IN')}`;
}

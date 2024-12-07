let shippingCost = parseFloat(localStorage.getItem('shippingCost')) || 0; // Ensure it reads from localStorage first

// Function to set the shipping cost
export function setShippingCost(cost) {
  shippingCost = cost;
  localStorage.setItem('shippingCost', cost);  // Store it in localStorage
}

// Function to get the current shipping cost
export function getShippingCost() {
  return parseFloat(localStorage.getItem('shippingCost')) || shippingCost; // Ensure it retrieves from localStorage if available
}

export function formatCurrency(price) {
    price = (price / 100).toFixed(2)
    return price 
}
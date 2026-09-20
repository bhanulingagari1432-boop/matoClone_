const menu = [{
    id: 1,
    name: 'Truffle Mushroom Pizza',
    restaurant: 'The Oven Story',
    price: 349,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Butter Chicken Bowl',
    restaurant: 'Punjab Grill',
    price: 429,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Classic Smash Burger',
    restaurant: 'Burger Singh',
    price: 279,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Mango Poke Bowl',
    restaurant: 'Green Theory',
    price: 319,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80'
  }
];

function getCart() {
  return JSON.parse(localStorage.getItem('mato-cart') || '[]');
}

function addToCart(id) {
  const item = menu.find((entry) => entry.id === id);
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({
    ...item,
    quantity: 1
  });
  localStorage.setItem('mato-cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${item.name} added to your cart`);
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach((element) => {
    element.textContent = count;
    element.classList.toggle('hidden', count === 0);
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[var(--color-text)] px-5 py-3 text-sm font-semibold text-white shadow-soft';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2400);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.add)));
  });
  document.querySelectorAll('[data-menu-toggle]').forEach((button) => {
    button.addEventListener('click', () => document.querySelector('#mobile-menu').classList.toggle('hidden'));
  });
});

// JavaScript for product search functionality
function searchProduct() {
    const query = document.getElementById("search").value;
    alert("Searching for: " + query);
}

// Optional: Handle other interactive features
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        alert("Product clicked: " + product.querySelector('h3').textContent);
    });
});

// scripts.js

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1, image });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const tbody = document.getElementById('cart-items');
  const totalSpan = document.getElementById('cart-total');
  tbody.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    const row = document.createElement('tr');

    const totalPrice = (item.qty * item.price).toFixed(2);
    total += parseFloat(totalPrice);

    row.innerHTML = `
      <td><img src="${item.image}" width="80"/></td>
      <td>${item.name}</td>
      <td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${index}, this.value)" /></td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${totalPrice}</td>
      <td><button onclick="removeItem(${index})" class="remove-btn">X</button></td>
    `;
    tbody.appendChild(row);
  });

  totalSpan.textContent = `$${total.toFixed(2)}`;
}

function updateQty(index, qty) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].qty = parseInt(qty);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

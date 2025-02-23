document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.querySelector('.cart');
  const totalAmountElement = document.querySelector('.total-amount');

  function renderCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p class="empty-basket">Ваш кошик порожній</p>';
      totalAmountElement.textContent = '0$';
      return;
    }

    let totalAmount = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('item');

      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      cartItem.innerHTML = `
      <section class="item__product-block">
        <div class="item__product-line">
          <img class="product-image-basket" src="${item.image}" alt="${item.name}">
          <span class="item__product-name">${item.name}</span>
           <span class="item__product-price">${item.price}$</span>
          <div class="item__product-quantity">
            <img src="images/minus.svg" class="quantity-btn minus" alt="minus">
            <span class="item__product-number">${item.quantity}</span>
            <img src="images/plus.svg" class="quantity-btn plus" alt="plus">
          </div>
          <span class="item__product-total">${itemTotal.toFixed(2)}$</span>
          <img src="images/remove.svg" class="remove-btn" alt="remove">
        </div>
      </section>
      `;

      cartContainer.appendChild(cartItem);

      const minusBtn = cartItem.querySelector('.minus');
      const plusBtn = cartItem.querySelector('.plus');
      const removeBtn = cartItem.querySelector('.remove-btn');

      minusBtn.addEventListener('click', () => updateQuantity(item.id, -1));
      plusBtn.addEventListener('click', () => updateQuantity(item.id, 1));
      removeBtn.addEventListener('click', () => removeItem(cartItem, item.id));
    });

    totalAmountElement.textContent = `${totalAmount.toFixed(2)}$`;
  }

  function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity += change;

      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartCounter();
    }
  }

  function removeItem(cartItem, productId) {
    cartItem.classList.add('fade-out');

    setTimeout(() => {
      const itemIndex = cart.findIndex((item) => item.id === productId);
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCounter();
      }
    }, 300);
  }

  function updateCartCounter() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
      cartCounter.textContent = totalItems;
      cartCounter.style.visibility = totalItems > 0 ? 'visible' : 'hidden';
    }
  }

  renderCart();
  updateCartCounter();
});

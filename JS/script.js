// modal header

document.addEventListener('DOMContentLoaded', function () {
  const orderButton = document.querySelector('.button__inner');
  const modal = document.getElementById('orderModal');
  const closeButton = modal.querySelector('.close');

  function openModal() {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }

  function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 400);
  }

  orderButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});

// show cards

function animateFirstRow() {
  const cards = document.querySelectorAll('.product-card');
  const firstRow = [...cards];

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  firstRow.forEach((card) => observer.observe(card));
}

//showing all cards

document.addEventListener('DOMContentLoaded', function () {
  let productsData = [];

  function loadProducts() {
    fetch('products.json')
      .then((response) => response.json())
      .then((products) => {
        productsData = products;
        renderProducts(productsData);
      })
      .catch((error) => console.error('Помилка завантаження JSON:', error));
  }

  function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.dataset.id = product.id;

      productCard.innerHTML = `
              <img class="product-image" src="${product.image}" alt="${product.name}">
              <h3 class="product-title">${product.name}</h3>
              <div class="product-buttons">
                  <span class="price">${product.price}$</span>
                  <button class="buy-button">
                      <img src="images/Buy.svg" alt="Купити">
                  </button>
              </div>
          `;

      productList.appendChild(productCard);
    });

    animateAllCards();
  }

  // sorting products

  function sortProducts(criteria) {
    let sortedProducts = [...productsData];

    switch (criteria) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedProducts = [...productsData];
    }

    renderProducts(sortedProducts);
  }

  document.getElementById('sort').addEventListener('change', function (e) {
    sortProducts(e.target.value);
  });

  loadProducts();
});

//animation of all cards

function animateAllCards() {
  const cards = document.querySelectorAll('.product-card');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  cards.forEach((card) => observer.observe(card));
}

//menu open

const menuButton = document.getElementById('menuButton');
const sideMenu = document.getElementById('sideMenu');

menuButton.addEventListener('click', function (event) {
  sideMenu.classList.toggle('open');
  event.stopPropagation();
});

document.addEventListener('click', function (event) {
  if (
    sideMenu.classList.contains('open') &&
    !sideMenu.contains(event.target) &&
    event.target !== menuButton
  ) {
    sideMenu.classList.remove('open');
  }
});

// buy alert

function createNotificationContainer() {
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    document.body.appendChild(container);
  }
  return container;
}

function showNotification(message) {
  const container = createNotificationContainer();
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;

  container.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 1000);
  }, 3000);
}

// Cart Management

document.addEventListener('DOMContentLoaded', function () {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCounter = document.getElementById('cart-counter');

  function updateCartCounter() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
    cartCounter.style.visibility = totalItems > 0 ? 'visible' : 'hidden';
  }

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        quantity: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
  }

  document.body.addEventListener('click', function (event) {
    if (event.target.closest('.buy-button')) {
      const productCard = event.target.closest('.product-card');
      const product = {
        id: parseInt(productCard.dataset.id),
        name: productCard.querySelector('.product-title').textContent,
        price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
        image: productCard.querySelector('.product-image').src,
      };
      addToCart(product);
      showNotification('Товар додано до кошика!');
    }
  });

  updateCartCounter();
});

// card bloc-details

document.addEventListener('DOMContentLoaded', function () {
  const productImage = document.querySelector('.product-image');
  const modal = document.getElementById('orderModal');
  const closeButton = modal.querySelector('.close');

  function openCardModal() {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }

  function closeCardModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 400);
  }

  orderButton.addEventListener('click', openCardModal);
  closeButton.addEventListener('click', closeCardModal);

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});

// script.js

async function fetchProducts() {
    try {
        showLoadingIndicator(); // Show a loading indicator while fetching data
        const response = await fetch('https://static.cloud.noroff.dev/api/rainy-days');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        alert('Failed to fetch products. Please try again later.');
    } finally {
        hideLoadingIndicator(); // Hide the loading indicator
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3 class="product-name">${product.title}</h3>
                <p class="brand-name">RAINYDAYS</p>
                <p class="price">${product.onSale ? product.discountedPrice : product.price} kr.</p>
                <button onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

// Call the fetch function on page load
window.onload = fetchProducts;

// Placeholder functions for loading indicator
function showLoadingIndicator() {
    // Implement loading indicator display
}

function hideLoadingIndicator() {
    // Implement loading indicator hide
}

function addToCart(productId) {
    // Logic to add the product to the cart
    console.log(`Product added to cart: ${productId}`); // Remove this in final submission
}

// Sample function to fetch products
async function fetchProducts() {
    try {
      showLoadingIndicator(); // Show loading indicator
      const response = await fetch('https://static.cloud.noroff.dev/api/rainy-days');
      const products = await response.json();
      displayProducts(products); // Function to display products
    } catch (error) {
      alert('Failed to fetch products. Please try again later.');
    } finally {
      hideLoadingIndicator(); // Hide loading indicator
    }
  }
  async function fetchProduct(productId) {
    try {
      const response = await fetch(`https://static.cloud.noroff.dev/api/rainy-days/${productId}`);
      const product = await response.json();
      displayProductDetails(product); // Function to display product details
    } catch (error) {
      alert('Failed to fetch product details. Please try again later.');
    }
  }
  function displayCart() {
    const cartItems = getCartItems(); // Function to get items from local storage or state
    // Render cart items
  }
  
  function removeFromCart(productId) {
    // Logic to remove item from cart
    displayCart(); // Refresh the cart display
  }
  
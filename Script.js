// Function to fetch products from the API
async function fetchProducts() {
  try {
      const response = await fetch('https://api.noroff.dev/api/v1/rainy-days'); // Replace with the correct endpoint
      const products = await response.json(); // Parse the JSON data from the response
      displayProducts(products); // Call a function to display products on the page
  } catch (error) {
      console.error('Error fetching products:', error);
      alert('There was an issue fetching the products. Please try again later.');
  }
}

// Function to display products dynamically
function displayProducts(products) {
  const productList = document.getElementById('product-list'); // Get the product container

products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card'); // Add the product card class

// Create the link to the specific product page
const productLink = document.createElement('a');
productLink.href = `product/index.html?id=${product.id}`; // Link to the specific product page

// Check if there is a discounted price
let priceHTML = `<p class="price">${product.price} kr</p>`; // Default price
if (product.discountedPrice) {
    priceHTML = `<p class="price discounted">
                    <span class="original-price">${product.price} kr</span> 
                    ${product.discountedPrice} kr
                  </p>`;
 }
productCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h3 class="product-name">${product.title}</h3>
    <p class="price">${product.onSale ? `<span class="discounted-price">${product.discountedPrice}</span> <span class="original-price">${product.price}</span>` : `${product.price}`}</p>
    <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.title}" data-price="${product.discountedPrice || product.price}">Add to Cart</button>
`;

productList.appendChild(productCard); // Append each product card to the container
});
}


let cart = []; // Initialize an empty array to hold the cart items
// Sample function to add a product to the cart

// Function to add product to the cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get existing cart from localStorage or initialize as empty
  cart.push(product); // Add the selected product to the cart
  localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart back to localStorage
}

// Function to handle "Add to Cart" button click
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart-btn')) {
      const productId = e.target.dataset.id;
      const productName = e.target.dataset.name;
      const productPrice = e.target.dataset.price;
      const productImage = e.target.dataset.image; // Assuming each product has an image attribute
      const productDiscountedPrice = e.target.dataset.discountedPrice || null;

      // Create product object
      const product = {
          id: productId,
          name: productName,
          price: parseFloat(productPrice),
          image: productImage,
          discountedPrice: parseFloat(productDiscountedPrice), // Optional if discounted price is available
      };

      // Add the product to the cart
      addToCart(product);
      alert(`${productName} has been added to your cart!`);
  }
});


// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId); // Find the product by ID
    if (product) {
        cart.push(product); // Add the product to the cart array
        alert(`${product.title} has been added to your cart!`);
        updateCartCount(); // Update the cart icon with the number of items
    }
}

function updateCartCount() {
  const cartCount = cart.length;
  const cartIcon = document.getElementById('cart-icon'); // Make sure you have an element with this ID
  cartIcon.textContent = cartCount; // Update the cart icon with the number of items
}

// Run the fetchProducts function when the page is loaded
window.onload = function() {
  fetchProducts();
};

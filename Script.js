let products = [];  // Declare the products array globally

// Function to fetch products from the v1 API
async function fetchProducts() {
    try {
        // Fetch data from the v1 API
        const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        // Parse the response data
        products = await response.json(); // Store the products in the global variable

        // Display the products on the homepage
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to display the products on the homepage
function displayProducts(products) {
    const productContainer = document.querySelector('.product-container');
    
    // Clear the container first (in case of re-render)
    productContainer.innerHTML = '';

    // Loop through the products and generate HTML for each
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3 class="product-name">${product.title}</h3>
            <p class="price">${product.discountedPrice ? 
                `<span class="original-price">${product.price} kr</span> 
                 ${product.discountedPrice} kr` : `${product.price} kr`}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        
        // Append each product card to the product container
        productContainer.appendChild(productCard);
    });
}

// Event listener for the "Add to Cart" button
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart-btn')) {
      // Capture product data from the button's data-* attributes
      const productId = e.target.dataset.id;
      const productName = e.target.dataset.name;  // Capture the name correctly
      const productPrice = e.target.dataset.price;
      const productImage = e.target.dataset.image;
      const productDiscountedPrice = e.target.dataset.discountedPrice || null;

      // Create a product object with the data from the button's data-* attributes
      const product = {
          id: productId,
          name: productName,  // Ensure 'name' is assigned
          price: parseFloat(productPrice),
          image: productImage,
          discountedPrice: productDiscountedPrice ? parseFloat(productDiscountedPrice) : null
      };

      // Add the product to the cart
      addToCart(product);

      // Optionally show a message or update UI here
      alert(`${productName} has been added to your cart!`);
  }
});

// Function to add product to cart
function addToCart(productId) {
    // Ensure products are loaded before attempting to access it
    if (!products || products.length === 0) {
        console.error("Products not loaded yet.");
        return;
    }

    // Find the product by ID from the global 'products' array
    const product = products.find(p => p.id === productId);

    if (product) {
        // Get the existing cart from localStorage, or initialize as an empty array if not available
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the product to the cart
        cart.push(product);

        // Save the updated cart back into localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.title} has been added to your cart!`);
    } else {
        console.error('Product not found');
    }
}

// Call the fetchProducts function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchProducts(); // Fetch products from the v1 API
});

// Initialize the cart (in-memory or from localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load from localStorage if available

// Function to display cart items
function displayCart() {
    const cartContainer = document.querySelector('.cart-container');
    const totalElement = document.querySelector('.total-price');
    
    // Clear the container first (in case of re-render)
    cartContainer.innerHTML = '';

    // Display each item in the cart
    let total = 0;

    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        // Create the product HTML
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="product-details">
                <h2>${item.name}</h2>
                <p class="price">${item.discountedPrice ? 
                    `<span class="original-price">${item.price} kr</span> 
                     ${item.discountedPrice} kr` : `${item.price} kr`}</p>
            </div>
            <button class="remove-button" data-id="${item.id}">Remove</button>
        `;
        
        // Append product element to cart container
        cartContainer.appendChild(productElement);

        // Calculate the total price
        total += item.discountedPrice || item.price;
    });

    // Update the total price
    totalElement.textContent = total.toFixed(2) + ' kr';
}

// Function to handle removing a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); // Remove the item with the given ID
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    displayCart(); // Re-render the cart after removal
}

// Attach event listeners to remove buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-button')) {
        const productId = e.target.dataset.id;
        removeFromCart(productId);
    }
});

// Run the displayCart function when the page loads
window.onload = displayCart;

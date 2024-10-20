// // Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart icon count
    updateCartIcon();
}

// Call this function when a product's "Add to Cart" button is clicked
// Example usage:
document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    addToCart('rocket_jacket', 'Rocket Jacket', 1990);
});


function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);

    // Update the icon to show the cart count in the red circle
    const cartIcon = document.querySelector('.icon');
    let cartCountElement = cartIcon.querySelector('.cart-count');

    if (!cartCountElement) {
        cartCountElement = document.createElement('div');
        cartCountElement.classList.add('cart-count');
        cartIcon.appendChild(cartCountElement);
    }

    cartCountElement.innerText = cartCount;
}

// Call this function when the page loads to initialize the count
document.addEventListener('DOMContentLoaded', updateCartIcon);


document.querySelector('.icon').addEventListener('click', function() {
    window.location.href = 'cart.html';  // Replace with your actual cart page URL
});

// In cart.html, retrieve and display the cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-container');  // Assuming you have this in your cart.html

    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="images/${product.id}.jpg" alt="${product.name}">
            <div class="product-details">
                <h2>${product.name}</h2>
                <p>${product.price} kr</p>
                <p>Quantity: ${product.quantity}</p>
                <button class="remove-button" data-id="${product.id}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(productElement);
    });

    // Add remove functionality
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(button.dataset.id);
        });
    });
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart
    displayCart();
    updateCartIcon();
}

document.addEventListener('DOMContentLoaded', displayCart);


// In the cart.html, handle the order placement
document.querySelector('.checkout-button').addEventListener('click', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Store order details in session storage for the confirmation page
    sessionStorage.setItem('order', JSON.stringify(cart));

    // Clear the cart
    localStorage.removeItem('cart');

    // Redirect to the confirmation page
    window.location.href = 'confirmation.html';  // Replace with your confirmation page URL
});

// In confirmation.html, display the order
function displayOrderConfirmation() {
    let order = JSON.parse(sessionStorage.getItem('order')) || [];
    const orderContainer = document.querySelector('.order-container');  // Assuming you have this in confirmation.html

    order.forEach(product => {
        const orderElement = document.createElement('div');
        orderElement.innerHTML = `
            <p>${product.name} - ${product.quantity} pcs - ${product.price * product.quantity} kr</p>
        `;
        orderContainer.appendChild(orderElement);
    });
}

document.addEventListener('DOMContentLoaded', displayOrderConfirmation);

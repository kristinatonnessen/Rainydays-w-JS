document.addEventListener('DOMContentLoaded', function() {
    // Initialize the cart (in-memory or from localStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load from localStorage if available
    console.log(cart); // Check the contents of the cart

    // Function to display cart items
    function displayCart() {
        const cartContainer = document.querySelector('.cart-container');
        const totalElement = document.querySelector('.total-price');
        
        // Check if totalElement is found
        if (!totalElement) {
            console.error('Total price element not found.');
            return;
        }

        // Clear the container first (in case of re-render)
        cartContainer.innerHTML = '';

        // Display each item in the cart
        let total = 0;

        cart.forEach(item => {
            console.log(item); // Check each item in the cart
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

    // Run the displayCart function when the page loads
    displayCart();
});

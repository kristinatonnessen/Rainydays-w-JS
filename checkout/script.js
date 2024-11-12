document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load from localStorage if available
    console.log(cart); // Check the contents of the cart

    // Function to add a product to the cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get existing cart from localStorage or initialize as empty
        cart.push(product); // Add the selected product to the cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart back into localStorage
        console.log('Product added to cart:', product); // Debugging: check the product in the console
    }

// Function to display cart items
function displayCart() {
    const cartContainer = document.querySelector('.cart-container');
    const totalElement = document.querySelector('.total-price');
    
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
                <p class="price">
                    ${item.discountedPrice ? 
                        `<span class="original-price">${item.price} €</span> 
                         ${item.discountedPrice} €` : 
                         `${item.price} €`}
                </p>
            </div>
            <button class="remove-button" data-id="${item.id}">REMOVE</button>
        `;
        
        // Append product element to cart container
        cartContainer.appendChild(productElement);

        // Calculate the total price
        total += item.discountedPrice || item.price;
    });

    // Update the total price
    totalElement.textContent = total.toFixed(2) + ' €';
}



    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart)); 
        displayCart();
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-button')) {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        }
    });

    // Run the displayCart function when the page loads
    displayCart();

    // Event listener for the "Add to Cart" button
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            // Capture product data from the button's data-* attributes
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = e.target.dataset.price;
            const productImage = e.target.dataset.image;
            const productDiscountedPrice = e.target.dataset.discountedPrice || null;

            // Create a product object with the data from the button's data-* attributes
            const product = {
                id: productId,
                name: productName,
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
});

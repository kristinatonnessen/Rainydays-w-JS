document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; 
    console.log(cart); 

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; 
        cart.push(product); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        console.log('Product added to cart:', product); 
    }

function displayCart() {
    const cartContainer = document.querySelector('.cart-container');
    const totalElement = document.querySelector('.total-price');
    
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        console.log(item);
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="product-details">
                <h3 class="product-name">
                ${item.title}</h3>
                <p class="price">
                    ${item.discountedPrice ? 
                        `<span class="original-price">${item.price} €</span> ${item.discountedPrice} €` : 
                        `${item.price} €`}
                </p>
            </div>
            <button class="remove-button" data-id="${item.id}">REMOVE</button>
        `;
        
        cartContainer.appendChild(productElement);

        total += item.discountedPrice || item.price;
    });

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

    displayCart();

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = e.target.dataset.price;
            const productImage = e.target.dataset.image;
            const productDiscountedPrice = e.target.dataset.discountedPrice || null;

            const product = {
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                discountedPrice: productDiscountedPrice ? parseFloat(productDiscountedPrice) : null
            };

            addToCart(product);

            alert(`${productName} has been added to your cart!`);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const checkoutContainer = document.querySelector('.checkout-container');
    const totalElement = document.querySelector('.total-price');

    checkoutContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('checkout-product');

        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="checkout-product">
            <div class="product-details">
                <h3>${item.title}</h3>
                <p class="price">${item.discountedPrice ? 
                    `<span class="original-price">${item.price} €</span> 
                     ${item.discountedPrice} €` : `${item.price} €`}</p>
            </div>
        `;

        checkoutContainer.appendChild(productElement);

        total += item.discountedPrice || item.price;
    });

    totalElement.textContent = total.toFixed(2) + ' €';
});

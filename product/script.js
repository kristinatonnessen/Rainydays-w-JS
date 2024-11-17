document.addEventListener('DOMContentLoaded', function () {
    const productId = new URLSearchParams(window.location.search).get('id');
    const productEndpoint = `https://api.noroff.dev/api/v1/rainy-days/${productId}`;

    async function fetchProductDetails() {
        try {
            const response = await fetch(productEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }

            const product = await response.json();

            document.getElementById('product-title').textContent = product.title;
            document.getElementById('product-description').textContent = product.description;

            document.getElementById('main-image').src = product.image;

            const isOnSale = product.onSale;
            const productPrice = isOnSale ? product.discountedPrice : product.price;
            const originalPriceHTML = isOnSale ? `<span class="original-price">${product.price} €</span>` : '';

            document.getElementById('product-price').innerHTML = `${originalPriceHTML} ${productPrice} €`;

            const addToCartButton = document.getElementById('add-to-cart-btn');
            addToCartButton.addEventListener('click', function () {
                
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push({
                    id: product.id,
                    name: product.title,
                    price: product.discountedPrice || product.price,
                    image: product.image,
                });
                localStorage.setItem('cart', JSON.stringify(cart));

                alert(`${product.title} has been added to your cart!`);
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    fetchProductDetails();
});

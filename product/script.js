document.addEventListener('DOMContentLoaded', function () {
    // Get the product ID from the URL
    const productId = new URLSearchParams(window.location.search).get('id');
    const productEndpoint = `https://api.noroff.dev/api/v1/rainy-days/${productId}`;

    // Fetch product details from API
    async function fetchProductDetails() {
        try {
            const response = await fetch(productEndpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }

            const product = await response.json();

            // Populate the product details
            document.getElementById('product-title').textContent = product.title;
            document.getElementById('product-price').textContent = `${product.discountedPrice ? product.discountedPrice : product.price} €`;
            document.getElementById('product-description').textContent = product.description;

            // Populate images
            document.getElementById('main-image').src = product.image;


            // Handle "Add to Cart" button
            const addToCartButton = document.getElementById('add-to-cart-btn');
            addToCartButton.addEventListener('click', function () {
                
                // Add product to cart (use localStorage)
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

    // Call fetchProductDetails to populate the page
    fetchProductDetails();
});

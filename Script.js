let products = []; 

async function fetchProducts() {
    try {
        const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        products = await response.json(); 

        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
  const productContainer = document.querySelector('#product-list');
  
  productContainer.innerHTML = '';

  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      
      const productLink = document.createElement('a');
      productLink.href = `product/index.html?id=${product.id}`; 

      productLink.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3 class="product-name">${product.title}</h3>
          <p class="price">${product.discountedPrice ? 
              `<span class="original-price">${product.price} kr</span> 
               ${product.discountedPrice} kr` : `${product.price} kr`}</p>
      `;
      
      productCard.appendChild(productLink);

      productContainer.appendChild(productCard);
  });
}

function filterProducts() {
    const category = document.querySelector('#category-filter').value;
    const gender = document.querySelector('#gender-filter').value;
    const genre = document.querySelector('#genre-filter').value;

    const filteredProducts = products.filter(product => {
        const categoryMatch = category ? product.tags.includes(category) : true;
        const genderMatch = gender ? product.gender === gender : true;
        const genreMatch = genre ? product.tags.includes(genre) : true;

        return categoryMatch && genderMatch && genreMatch;
    });

    displayProducts(filteredProducts);
}

document.querySelector('#gender-filter').addEventListener('change', filterProducts);


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.dataset.id; 
        addToCart(productId); 
    }
});

function addToCart(productId) {
    if (!products || products.length === 0) {
        console.error("Products not loaded yet.");
        return;
    }

    const product = products.find(p => p.id === productId);

    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.title} has been added to your cart!`);
    } else {
        console.error('Product not found');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetchProducts(); 
});

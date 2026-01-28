let productsData = []; 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// FUNCIÓN DE UTILIDAD: Centraliza el formato de precios
function formatPrice(price) {
    if (price === null || price === undefined) return "";
    return `$${price.toLocaleString('es-AR')}`;
}

document.addEventListener("DOMContentLoaded", function () {
    // Configurar botones del carrito
    const cartButton = document.getElementById('cart-button');
    if (cartButton) cartButton.addEventListener('click', toggleCart);

    const closeCartButton = document.getElementById('close-cart');
    if (closeCartButton) closeCartButton.addEventListener('click', toggleCart);

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) checkoutButton.addEventListener('click', checkout);

    // Cargar productos
    fetch('../productos.json')
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return response.json();
        })
        .then(products => {
            productsData = products;
            generateProducts(productsData);
            initializeStockWarnings(productsData);
            updateCart(productsData);
            setupEventListeners(productsData);
        })
        .catch(error => {
            console.error("Error al cargar productos:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Carga',
                text: `No se pudo cargar el catálogo.`,
                confirmButtonText: 'Aceptar'
            });
        });
});

function handleGridClick(event) {
    const target = event.target;
    const action = target.getAttribute('data-action');
   
    if (action) {
        if (action === 'decrementSlices') decrementSlices(target);
        else if (action === 'incrementSlices') incrementSlices(target);
        else if (action === 'decrementCakes') decrementCakes(target);
        else if (action === 'incrementCakes') incrementCakes(target);
        else if (action === 'addToCart') addToCart(target);
    }
}

function setupEventListeners(products) {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gridContainer = document.getElementById('grid');

    if (searchInput) {
        searchInput.addEventListener('keyup', () => filterAndSearchProducts(products));
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            filterAndSearchProducts(products);
        });
    });

    if (gridContainer) {
        gridContainer.addEventListener('click', handleGridClick);
    }
}

function filterAndSearchProducts(products) {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
        return matchesSearch && matchesCategory;
    });

    generateProducts(filteredProducts);
    initializeStockWarnings(filteredProducts);
}

function generateProducts(products) {
    const container = document.getElementById("grid");
    if (!container) return;
    container.innerHTML = "";
   
    if (products.length === 0) {
        container.innerHTML = '<p class="no-results-msg">No se encontraron productos.</p>';
        return;
    }

    products.forEach((product, index) => {
        const carouselId = `carousel-${product.name.replace(/[^a-zA-Z0-9]/g, '')}`;
        const imagesHTML = product.images.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="${product.name}">
            </div>
        `).join('');

        const sliceControlsHTML = product.slicePrice !== null ? `
            <p class="stock-warning-slices" style="display: none; color: red; font-weight: bold; font-size: 10px; text-align:center;">⚠️ Última porción</p>
            <div class="count-controls">
                <button class="btn-count" data-action="decrementSlices">-</button>
                <p>Porciones: ${formatPrice(product.slicePrice)}</p> 
                <button class="btn-count" data-action="incrementSlices">+</button>
            </div>
            <div class="slice-count">
                <p>Cant:</p> <span id="sliceCount">0</span>
            </div>
        ` : '';

        // AQUI SE AGREGA LA CLASE 'reveal'
        const productHTML = `
            <div class="product-card reveal">
                <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${imagesHTML}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    ${sliceControlsHTML}
                    <p class="stock-warning-cakes" style="display: none; color: red; font-weight: bold; font-size: 10px; text-align:center;">⚠️ Último en stock</p>
                    <div class="count-controls">
                        <button class="btn-count" data-action="decrementCakes">-</button>
                        <p>Entera: ${formatPrice(product.cakePrice)}</p> 
                        <button class="btn-count" data-action="incrementCakes">+</button>
                    </div>
                    <div class="cake-count">
                        <p>Cant:</p> <span id="cakeCount">0</span>
                    </div>
                    <div class="add-to-cart">
                        <button class="btn-add-to-cart" data-action="addToCart">Agregar</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });

    // Iniciar animación después de renderizar
    setTimeout(initScrollReveal, 100);
}

// ... (Funciones de incremento/decremento y carrito iguales, pero asegurando variables globales)

function incrementSlices(button) {
    let card = button.closest('.card-body');
    let sliceSpan = card.querySelector('.slice-count span');
    sliceSpan.textContent = (parseInt(sliceSpan.textContent) || 0) + 1;
}

function decrementSlices(button) {
    let card = button.closest('.card-body');
    let sliceSpan = card.querySelector('.slice-count span');
    let count = parseInt(sliceSpan.textContent) || 0;
    if (count > 0) sliceSpan.textContent = count - 1;
}

function incrementCakes(button) {
    let card = button.closest('.card-body');
    let cakeSpan = card.querySelector('.cake-count span');
    cakeSpan.textContent = (parseInt(cakeSpan.textContent) || 0) + 1;
}

function decrementCakes(button) {
    let card = button.closest('.card-body');
    let cakeSpan = card.querySelector('.cake-count span');
    let count = parseInt(cakeSpan.textContent) || 0;
    if (count > 0) cakeSpan.textContent = count - 1;
}

function addToCart(button) {
    let card = button.closest('.card-body');
    let title = card.querySelector('.card-title').textContent;
    let sliceCount = parseInt(card.querySelector('.slice-count span')?.textContent || 0);
    let cakeCount = parseInt(card.querySelector('.cake-count span')?.textContent || 0);

    let product = productsData.find(p => p.name === title);
    if (!product) return;

    if (sliceCount > product.stockSlices) {
        Swal.fire({ icon: 'error', title: 'Ups...', text: `Stock insuficiente de porciones.` });
        return;
    }
    if (cakeCount > product.stockCakes) {
        Swal.fire({ icon: 'error', title: 'Ups...', text: `Stock insuficiente de enteras.` });
        return;
    }

    product.stockSlices -= sliceCount;
    product.stockCakes -= cakeCount;
    updateStockWarning(card, product);

    if (sliceCount > 0 || cakeCount > 0) {
        let existingItem = cart.find(item => item.title === title);
        let sliceTotal = sliceCount * (product.slicePrice || 0);
        let cakeTotal = cakeCount * (product.cakePrice || 0);

        if (existingItem) {
            existingItem.sliceCount += sliceCount;
            existingItem.cakeCount += cakeCount;
            existingItem.sliceTotal += sliceTotal;
            existingItem.cakeTotal += cakeTotal;
        } else {
            cart.push({
                title, sliceCount, cakeCount, sliceTotal, cakeTotal,
                slicePrice: product.slicePrice, cakePrice: product.cakePrice
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(productsData);

        // Reset contadores visuales
        if (card.querySelector('.slice-count span')) card.querySelector('.slice-count span').textContent = 0;
        if (card.querySelector('.cake-count span')) card.querySelector('.cake-count span').textContent = 0;
        
        // Feedback visual en botón
        const originalText = button.textContent;
        button.textContent = "¡Agregado!";
        setTimeout(() => button.textContent = originalText, 1000);
    } else {
        Swal.fire({ icon: 'warning', title: 'Atención', text: 'Selecciona cantidad primero.' });
    }
}

function initializeStockWarnings(products) {
    document.querySelectorAll('.card-body').forEach(card => {
        let title = card.querySelector('.card-title').textContent;
        let product = products.find(p => p.name === title);
        if (product) updateStockWarning(card, product);
    });
}

function updateCart(products) {
    let cartContainer = document.getElementById('cart');
    if (!cartContainer) return;
    cartContainer.innerHTML = '';
    let totalItems = cart.reduce((total, item) => total + item.sliceCount + item.cakeCount, 0);

    if (cart.length === 0) {
        cartContainer.innerHTML = '<li>Tu carrito está vacío ☹️</li>';
        updateCartCounter(0);
        return;
    }

    cart.forEach((item, index) => {
        let li = document.createElement('li');
        let html = `<strong>${item.title}</strong><br>`;
        if (item.sliceCount > 0) html += `Porc: ${item.sliceCount} (${formatPrice(item.sliceTotal)}) <button class="btn-eliminar" onclick="removeSlices(${index})">X</button><br>`;
        if (item.cakeCount > 0) html += `Ent: ${item.cakeCount} (${formatPrice(item.cakeTotal)}) <button class="btn-eliminar" onclick="removeCakes(${index})">X</button>`;
        li.innerHTML = html;
        cartContainer.appendChild(li);
    });
    updateCartCounter(totalItems);
}

function removeSlices(index) {
    if (cart[index].sliceCount > 0) {
        cart[index].sliceCount--;
        cart[index].sliceTotal -= cart[index].slicePrice;
        let product = productsData.find(p => p.name === cart[index].title);
        if(product) product.stockSlices++;
        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) cart.splice(index, 1);
        saveAndRefresh();
    }
}

function removeCakes(index) {
    if (cart[index].cakeCount > 0) {
        cart[index].cakeCount--;
        cart[index].cakeTotal -= cart[index].cakePrice;
        let product = productsData.find(p => p.name === cart[index].title);
        if(product) product.stockCakes++;
        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) cart.splice(index, 1);
        saveAndRefresh();
    }
}

function saveAndRefresh() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(productsData);
    // Opcional: refrescar filtro si quieres actualizar vista
}

function updateCartCounter(totalItems) {
    let btn = document.getElementById('cart-button');
    if (btn) btn.textContent = `🛒 (${totalItems})`;
}

function updateStockWarning(card, product) {
    let warnSlices = card.querySelector('.stock-warning-slices');
    let warnCakes = card.querySelector('.stock-warning-cakes');
    if (warnSlices) warnSlices.style.display = (product.stockSlices === 1) ? "block" : "none";
    if (warnCakes) warnCakes.style.display = (product.stockCakes === 1) ? "block" : "none";
}

function toggleCart() {
    let panel = document.getElementById('cart-panel');
    if (panel) {
        panel.style.right = (panel.style.right === "0px") ? "-350px" : "0px";
        if (panel.style.right === "0px") updateCart(productsData);
    }
}

function checkout() {
    if (cart.length === 0) {
        Swal.fire({ icon: 'error', title: 'Vacío', text: 'Agrega productos primero.' });
        return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "pago.html";
}

// --- FUNCIÓN DE ANIMACIÓN ---
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 50;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); 
}

// Exponer globales
window.removeSlices = removeSlices;
window.removeCakes = removeCakes;
window.toggleCart = toggleCart;
window.checkout = checkout;
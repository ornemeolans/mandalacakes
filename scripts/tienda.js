let productsData = []; 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// FUNCIÓN DE UTILIDAD: Formato de precios Argentina
function formatPrice(price) {
    if (price === null || price === undefined) return "";
    return `$${price.toLocaleString('es-AR')}`;
}

// Función para calcular el stock remaining considerando el carrito
function getRemainingStock(product, cartItems) {
    const cartItem = cartItems.find(item => item.title === product.name);
    if (!cartItem) return { slices: product.stockSlices, cakes: product.stockCakes };
    
    return {
        slices: product.stockSlices - (cartItem.sliceCount || 0),
        cakes: product.stockCakes - (cartItem.cakeCount || 0)
    };
}

document.addEventListener("DOMContentLoaded", function () {
    // 1. Configurar botones del carrito (usando IDs seguros)
    const cartButton = document.getElementById('cart-button');
    if (cartButton) cartButton.addEventListener('click', toggleCart);

    const closeCartButton = document.getElementById('close-cart');
    if (closeCartButton) closeCartButton.addEventListener('click', toggleCart);

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) checkoutButton.addEventListener('click', checkout);

    // 2. Cargar productos usando el ProductService (Capa de Servicio)
    loadProducts();
});

// Función centralizada de carga de productos
async function loadProducts() {
    try {
        // Usar ProductService (preparado para API futura)
        let products;
        
        if (window.ProductService) {
            products = await window.ProductService.getProducts();
        } else {
            // Fallback si no carga productService.js
            const response = await fetch('../productos.json');
            products = await response.json();
            products = products.filter(p => p.disponible !== false);
        }
        
        // Guardar referencia al ID/SKU para uso futuro
        productsData = products.map(product => {
            // Guardar referencia por ID o SKU para integración con sistemas externos
            product._ref = product.sku || `ID-${product.id}`;
            return product;
        });
        
        // Aplicar persistencia de stock (restar lo del carrito)
        productsData = productsData.map(product => {
            const remaining = getRemainingStock(product, cart);
            return {
                ...product,
                stockSlices: remaining.slices,
                stockCakes: remaining.cakes
            };
        });
        
        generateProducts(productsData);
        initializeStockWarnings(productsData);
        updateCart(productsData);
        setupEventListeners(productsData);
        
        // Iniciar animación una vez cargados los productos
        setTimeout(initScrollReveal, 100);
        
    } catch (error) {
        console.error("Error al cargar productos:", error);
        // Mostrar "Empty State" visual más amigable
        const container = document.getElementById("grid");
        if (container) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <div style="font-size: 80px; margin-bottom: 20px;">😢</div>
                    <h3 style="color: #e7cec7; margin-bottom: 15px;">Ups! Algo salió mal</h3>
                    <p style="color: #e7cec7; margin-bottom: 25px;">No pudimos cargar los productos en este momento.</p>
                    <button onclick="location.reload()" class="filter-btn" style="display: inline-block;">
                        Recargar Página
                    </button>
                </div>
            `;
        }
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema cargando los productos. Por favor intentá de nuevo.',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Manejador centralizado de clicks en la grilla (Mejor rendimiento)
function handleGridClick(event) {
    const target = event.target;
    // Buscar el botón más cercano por si se hizo click en un icono dentro del botón
    const button = target.closest('button'); 
    
    if (!button) return;

    const action = button.getAttribute('data-action');
   
    if (action) {
        if (action === 'decrementSlices') decrementSlices(button);
        else if (action === 'incrementSlices') incrementSlices(button);
        else if (action === 'decrementCakes') decrementCakes(button);
        else if (action === 'incrementCakes') incrementCakes(button);
        else if (action === 'addToCart') addToCart(button);
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
    setTimeout(initScrollReveal, 50); // Re-animar al filtrar
}

function generateProducts(products) {
    const container = document.getElementById("grid");
    if (!container) return;
    container.innerHTML = "";
   
    if (products.length === 0) {
        container.innerHTML = '<p class="no-results-msg">No encontramos productos con ese nombre 😢</p>';
        return;
    }

    products.forEach((product, index) => {
        // ID único para el carrusel
        const carouselId = `carousel-${product.name.replace(/[^a-zA-Z0-9]/g, '')}`;
        
        // SKU para referencia futura (integración con sistemas externos)
        const skuDisplay = product.sku ? `<small style="color: #666; font-size: 10px;">SKU: ${product.sku}</small>` : '';
        
        // Imágenes con lazy loading y alt más descriptivo
        const imagesHTML = product.images.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${img}" 
                     class="d-block w-100" 
                     alt="Foto de ${product.name} de Mandala Cakes"
                     loading="lazy"
                     onload="this.classList.add('loaded')">
            </div>
        `).join('');

        // HTML condicional para porciones
        const sliceControlsHTML = product.slicePrice !== null ? `
            <div class="count-controls">
                <button class="btn-count" data-action="decrementSlices">-</button>
                <p>Porción: ${formatPrice(product.slicePrice)}</p> 
                <button class="btn-count" data-action="incrementSlices">+</button>
            </div>
            <div class="slice-count">
                <p>Porciones:</p> <span id="sliceCount">0</span>
            </div>
            <p class="stock-warning-slices" style="display: none; color: #ff6b6b; font-size: 11px; text-align: center;">¡Última porción!</p>
        ` : '';

        // Estructura de la tarjeta (Agregada clase 'reveal')
        const productHTML = `
            <div class="product-card reveal" data-product-id="${product.id}" data-sku="${product.sku || ''}">
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
                    ${skuDisplay}
                    <p class="card-text">${product.description}</p>
                    
                    ${sliceControlsHTML}
                    
                    <div class="count-controls">
                        <button class="btn-count" data-action="decrementCakes">-</button>
                        <p>Entera: ${formatPrice(product.cakePrice)}</p> 
                        <button class="btn-count" data-action="incrementCakes">+</button>
                    </div>
                    <div class="cake-count">
                        <p>Enteras:</p> <span id="cakeCount">0</span>
                    </div>
                    <p class="stock-warning-cakes" style="display: none; color: #ff6b6b; font-size: 11px; text-align: center;">¡Última unidad!</p>
                    
                    <div class="add-to-cart">
                        <button class="btn-add-to-cart" data-action="addToCart">AGREGAR AL PEDIDO</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

// --- FUNCIONES LÓGICAS ---

function incrementSlices(button) {
    let card = button.closest('.card-body');
    let sliceSpan = card.querySelector('.slice-count span');
    let count = parseInt(sliceSpan.textContent) || 0;
    sliceSpan.textContent = count + 1;
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
    let count = parseInt(cakeSpan.textContent) || 0;
    cakeSpan.textContent = count + 1;
}

function decrementCakes(button) {
    let card = button.closest('.card-body');
    let cakeSpan = card.querySelector('.cake-count span');
    let count = parseInt(cakeSpan.textContent) || 0;
    if (count > 0) cakeSpan.textContent = count - 1;
}

/**
 * Función para validar stock en tiempo real (preparada para API futura)
 * Actualmente usa validación local, pero puede usar ProductService.validarStock()
 */
async function validarStockEnTiempoReal(product, cantidad, tipo, sucursal) {
    // Si el ProductService está disponible y tiene validación en tiempo real
    if (window.ProductService && window.PRODUCT_CONFIG?.ENABLE_REALTIME_STOCK) {
        return await window.ProductService.validarStock(product, cantidad, tipo, sucursal);
    }
    
    // Validación local (funcionamiento actual)
    const stockKey = tipo === 'slice' ? 'stockSlices' : 'stockCakes';
    return product[stockKey] >= cantidad;
}

async function addToCart(button) {
    let card = button.closest('.card-body');
    let title = card.querySelector('.card-title').textContent;

    // Obtener la sucursal seleccionada del proceso de compra (si está definida)
    // En el futuro esto vendría del選択 de retiro en pago.html
    const sucursalSeleccionada = localStorage.getItem('sucursalSeleccionada') || 'takeAway';

    // Manejo seguro de selectores
    let sliceCount = parseInt(card.querySelector('.slice-count span')?.textContent || 0);
    let cakeCount = parseInt(card.querySelector('.cake-count span')?.textContent || 0);

    let product = productsData.find(p => p.name === title);
    if (!product) return;

    // Validar stock (preparado para API futura)
    if (sliceCount > 0) {
        const tieneStock = await validarStockEnTiempoReal(product, sliceCount, 'slice', sucursalSeleccionada);
        if (!tieneStock) {
            Swal.fire({ icon: 'error', title: 'Ups', text: `Solo quedan ${product.stockSlices} porciones.` });
            return;
        }
    }

    if (cakeCount > 0) {
        const tieneStock = await validarStockEnTiempoReal(product, cakeCount, 'cake', sucursalSeleccionada);
        if (!tieneStock) {
            Swal.fire({ icon: 'error', title: 'Ups', text: `Solo quedan ${product.stockCakes} tortas enteras.` });
            return;
        }
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
                title,
                productId: product.id,      // ID para integración futura
                sku: product.sku,          // SKU para integración futura
                sliceCount,
                cakeCount,
                sliceTotal,
                cakeTotal,
                slicePrice: product.slicePrice,
                cakePrice: product.cakePrice
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(productsData);

        // Reset visual
        if (card.querySelector('.slice-count span')) card.querySelector('.slice-count span').textContent = 0;
        if (card.querySelector('.cake-count span')) card.querySelector('.cake-count span').textContent = 0;
        
        // Feedback visual mejorado con animación
        showButtonFeedback(button);

    } else {
        Swal.fire({ 
            icon: 'warning', 
            title: '¡Epa!', 
            text: 'Tenés que elegir al menos una porción o una torta.',
            confirmButtonColor: '#8f3a42'
        });
    }
}

// Función de feedback visual mejorado para el botón
function showButtonFeedback(button) {
    const originalText = button.textContent;
    
    // Estado de carga
    button.classList.add('loading');
    button.innerHTML = '<span class="btn-spinner"></span>Agregando...';
    
    // Simular pequeña delay para dar feedback visual
    setTimeout(() => {
        button.classList.remove('loading');
        button.classList.add('success');
        button.innerHTML = '<span class="btn-check"></span>¡LISTO!';
        
        // Volver al estado original después de 1.5 segundos
        setTimeout(() => {
            button.classList.remove('success');
            button.textContent = originalText;
        }, 1500);
    }, 300);
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

        if (item.sliceCount > 0) {
            html += `Porc: ${item.sliceCount} (${formatPrice(item.sliceTotal)}) 
            <button class="btn-eliminar" onclick="removeSlices(${index})">X</button><br>`;
        }

        if (item.cakeCount > 0) {
            html += `Ent: ${item.cakeCount} (${formatPrice(item.cakeTotal)}) 
            <button class="btn-eliminar" onclick="removeCakes(${index})">X</button>`;
        }

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
        
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(productsData);
        updateStockDisplay();
    }
}

function removeCakes(index) {
    if (cart[index].cakeCount > 0) {
        cart[index].cakeCount--;
        cart[index].cakeTotal -= cart[index].cakePrice;
        let product = productsData.find(p => p.name === cart[index].title);
        if(product) product.stockCakes++;

        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) cart.splice(index, 1);
        
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(productsData);
        updateStockDisplay();
    }
}

// Actualizar la visualización del stock en las tarjetas
function updateStockDisplay() {
    document.querySelectorAll('.card-body').forEach(card => {
        let title = card.querySelector('.card-title').textContent;
        let product = productsData.find(p => p.name === title);
        if (product) {
            updateStockWarning(card, product);
        }
    });
}

function updateCartCounter(totalItems) {
    let btn = document.getElementById('cart-button');
    if (btn) btn.textContent = `🛒 Ver Carrito (${totalItems})`;
}

function updateStockWarning(card, product) {
    let warnSlices = card.querySelector('.stock-warning-slices');
    let warnCakes = card.querySelector('.stock-warning-cakes');

    if (warnSlices) warnSlices.style.display = (product.stockSlices === 1) ? "block" : "none";
    if (warnCakes) warnCakes.style.display = (product.stockCakes === 1) ? "block" : "none";
}

function initializeStockWarnings(products) {
    document.querySelectorAll('.card-body').forEach(card => {
        let title = card.querySelector('.card-title').textContent;
        let product = products.find(p => p.name === title);
        if (product) updateStockWarning(card, product);
    });
}

function toggleCart() {
    let panel = document.getElementById('cart-panel');
    if (panel) {
        panel.style.right = (panel.style.right === "0px") ? "-350px" : "0px";
    }
}

function checkout() {
    if (cart.length === 0) {
        Swal.fire({ icon: 'error', title: 'Vacío', text: '¡Agregá algo rico antes de pagar!' });
        return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "pago.html";
}

// --- ANIMACIÓN ---
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

// Exponer funciones globales necesarias para el HTML
window.removeSlices = removeSlices;
window.removeCakes = removeCakes;
window.toggleCart = toggleCart;
window.checkout = checkout;


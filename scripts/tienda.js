
let productsData = []; // Variable para almacenar los productos cargados
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// FUNCIÓN DE UTILIDAD: Centraliza el formato de precios
function formatPrice(price) {
    if (price === null || price === undefined) return "";
    return `$${price.toLocaleString('es-AR')}`;
}

document.addEventListener("DOMContentLoaded", function () {
    // Configurar el botón del carrito (Mejora: addEventListener en lugar de onclick en HTML)
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }

    const closeCartButton = document.getElementById('close-cart');
    if (closeCartButton) {
        closeCartButton.addEventListener('click', toggleCart);
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }

    // 1. Cargar productos de forma asíncrona
    fetch('../productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red o archivo no encontrado: ${response.status}`);
            }
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
                text: `No se pudo cargar el catálogo de productos. Detalle: ${error.message}`,
                confirmButtonText: 'Aceptar'
            });
        });
});

function handleGridClick(event) {
    const target = event.target;
    const action = target.getAttribute('data-action');
   
    if (action) {
        if (action === 'decrementSlices' && target.classList.contains('btn-count')) {
            decrementSlices(target);
        } else if (action === 'incrementSlices' && target.classList.contains('btn-count')) {
            incrementSlices(target);
        } else if (action === 'decrementCakes' && target.classList.contains('btn-count')) {
            decrementCakes(target);
        } else if (action === 'incrementCakes' && target.classList.contains('btn-count')) {
            incrementCakes(target);
        } else if (action === 'addToCart' && target.classList.contains('btn-add-to-cart')) {
            addToCart(target);
        }
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
        container.innerHTML = '<p class="no-results-msg">No se encontraron productos que coincidan con los filtros.</p>';
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
            <p class="stock-warning-slices" style="display: none; color: red; font-weight: bold;">⚠️ Última porción en stock</p>
            <div class="count-controls">
                <button class="btn-count" data-action="decrementSlices">-1</button>
                <p>Porciones: ${formatPrice(product.slicePrice)}</p> <button class="btn-count" data-action="incrementSlices">+1</button>
            </div>
            <div class="slice-count">
                <p>Porciones:</p> <span id="sliceCount">0</span>
            </div>
        ` : '';

        const productHTML = `
            <div class="product-card">
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
                    <p class="stock-warning-cakes" style="display: none; color: red; font-weight: bold;">⚠️ Último en stock</p>
                    <div class="count-controls">
                        <button class="btn-count" data-action="decrementCakes">-1</button>
                        <p>Entera: ${formatPrice(product.cakePrice)}</p> <button class="btn-count" data-action="incrementCakes">+1</button>
                    </div>
                    <div class="cake-count">
                        <p>Entera:</p> <span id="cakeCount">0</span>
                    </div>
                    <div class="add-to-cart">
                        <button class="btn-add-to-cart" data-action="addToCart">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

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
    if (count > 0) {
        sliceSpan.textContent = count - 1;
    }
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
    if (count > 0) {
        cakeSpan.textContent = count - 1;
    }
}

function addToCart(button) {
    let card = button.closest('.card-body');
    let title = card.querySelector('.card-title').textContent;

    let sliceSpan = card.querySelector('.slice-count span');
    let cakeSpan = card.querySelector('.cake-count span');

    let sliceCount = sliceSpan ? parseInt(sliceSpan.textContent) || 0 : 0;
    let cakeCount = cakeSpan ? parseInt(cakeSpan.textContent) || 0 : 0;

    let product = productsData.find(p => p.name === title);
    if (!product) return;

    let slicePrice = product.slicePrice || 0;
    let cakePrice = product.cakePrice || 0;

    let sliceTotal = sliceCount * slicePrice;
    let cakeTotal = cakeCount * cakePrice;

    if (sliceCount > product.stockSlices) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `❌ No hay suficientes porciones de ${title}. Stock disponible: ${product.stockSlices}`,
            confirmButtonText: 'Aceptar',
            customClass: { confirmButton: 'btn btn-primary' }
        });
        return;
    }

    if (cakeCount > product.stockCakes) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `❌ No hay suficientes tortas enteras de ${title}. Stock disponible: ${product.stockCakes}`,
            confirmButtonText: 'Aceptar',
            customClass: { confirmButton: 'btn btn-primary' }
        });
        return;
    }

    product.stockSlices -= sliceCount;
    product.stockCakes -= cakeCount;

    updateStockWarning(card, product);

    if (sliceCount > 0 || cakeCount > 0) {
        let existingItem = cart.find(item => item.title === title);

        if (existingItem) {
            existingItem.sliceCount += sliceCount;
            existingItem.cakeCount += cakeCount;
            existingItem.sliceTotal += sliceTotal;
            existingItem.cakeTotal += cakeTotal;
        } else {
            cart.push({
                title,
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

        if (sliceSpan) sliceSpan.textContent = 0;
        if (cakeSpan) cakeSpan.textContent = 0;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '❌ Por favor, selecciona al menos una porción o una torta entera antes de agregar al carrito.',
            confirmButtonText: 'Aceptar',
            customClass: { confirmButton: 'btn btn-primary' }
        });
    }
}

function initializeStockWarnings(products) {
    document.querySelectorAll('.card-body').forEach(card => {
        let title = card.querySelector('.card-title').textContent;
        let product = products.find(p => p.name === title);
        if (product) {
            updateStockWarning(card, product);
        }
    });
}

function updateCart(products) {
    let cartContainer = document.getElementById('cart');
    if (!cartContainer) return;
    cartContainer.innerHTML = '';

    let totalItems = cart.reduce((total, item) => total + item.sliceCount + item.cakeCount, 0);

    if (cart.length === 0) {
        cartContainer.innerHTML = '<li>El carrito está vacío</li>';
        updateCartCounter(0);
        return;
    }

    cart.forEach((item, index) => {
        let listItem = document.createElement('li');
        let text = `${item.title} - `;

        if (item.sliceCount > 0) {
            text += `Porciones: ${item.sliceCount} (${formatPrice(item.sliceTotal)}) `;
            text += `<button class="btn-eliminar" onclick="removeSlices(${index})">Eliminar porciones</button>`;
        }

        if (item.cakeCount > 0) {
            text += `| Enteras: ${item.cakeCount} (${formatPrice(item.cakeTotal)})`;
            text += `<button class="btn-eliminar" onclick="removeCakes(${index})">Eliminar enteras</button>`;
        }

        listItem.innerHTML = text.trim();
        cartContainer.appendChild(listItem);
    });

    updateCartCounter(totalItems);
}

function removeSlices(index) {
    if (cart[index].sliceCount > 0) {
        cart[index].sliceCount--;
        cart[index].sliceTotal -= cart[index].slicePrice;
       
        let product = productsData.find(p => p.name === cart[index].title);
        if(product && product.stockSlices !== undefined) product.stockSlices++;

        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(productsData);
        filterAndSearchProducts(productsData);
    }
}

function removeCakes(index) {
    if (cart[index].cakeCount > 0) {
        cart[index].cakeCount--;
        cart[index].cakeTotal -= cart[index].cakePrice;
       
        let product = productsData.find(p => p.name === cart[index].title);
        if(product && product.stockCakes !== undefined) product.stockCakes++;

        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(productsData);
        filterAndSearchProducts(productsData);
    }
}

function updateCartCounter(totalItems) {
    let cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.textContent = `🛒 Ver Carrito (${totalItems})`;
    }
}

function updateStockWarning(card, product) {
    let stockWarningSlices = card.querySelector('.stock-warning-slices');
    let stockWarningCakes = card.querySelector('.stock-warning-cakes');

    if (stockWarningSlices && product.stockSlices === 1) {
        stockWarningSlices.style.display = "block";
    } else if (stockWarningSlices) {
        stockWarningSlices.style.display = "none";
    }

    if (stockWarningCakes && product.stockCakes === 1) {
        stockWarningCakes.style.display = "block";
    } else if (stockWarningCakes) {
        stockWarningCakes.style.display = "none";
    }
}

function toggleCart() {
    let cartPanel = document.getElementById('cart-panel');
    if (!cartPanel) return;
    if (cartPanel.style.right === "0px") {
        cartPanel.style.right = "-350px";
    } else {
        cartPanel.style.right = "0px";
        updateCart(productsData);
    }
}

function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu carrito está vacío. Agrega productos antes de finalizar la compra.',
            confirmButtonText: 'Aceptar',
            customClass: { confirmButton: 'btn btn-primary' }
        });
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "pago.html";
}

// Exponer funciones globales para botones en línea (remove/eliminar)
window.removeSlices = removeSlices;
window.removeCakes = removeCakes;
// toggleCart y checkout ya no se necesitan exponer si usamos addEventListener,
// pero no hace daño dejarlas por si acaso hay otros botones
window.toggleCart = toggleCart;
window.checkout = checkout;

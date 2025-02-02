const products = [
    { name: "ALASKA", description: "Cheesecake de chocolate blanco y dulce de leche, con una fina capa de chocolate con leche y ganache de chocolate blanco. <br>Rinde 15-20 porciones.", slicePrice: 8500, cakePrice: 51000, stockSlices: 24, stockCakes: 5, images: ["../assets/alaska (1).jpg", "../assets/alaska (2).jpg", "../assets/alaska (3).jpg"] },
    { name: "RUFINA", description: "Base de oreo, dulce de leche, cream cheese de dulce de leche, merengue italiano. <br>Rinde 15-20 porciones.", slicePrice: 8200, cakePrice: 49200, stockSlices: 24, stockCakes: 5, stockSlices: 24, stockCakes: 5, images: ["../assets/rufina (1).jpg", "../assets/rufina (2).jpg", "../assets/rufina (3).jpg"] },
    { name: "PATAGONIA", description: "Base de chocolate con nueces, dulce de leche y ganache de chocolate blanco con frutos rojos. <br>Rinde 15-20 porciones.", slicePrice: 8000, cakePrice: 48000, stockSlices: 24, stockCakes: 5, images: ["../assets/patagonia (1).jpg", "../assets/patagonia (2).jpg", "../assets/patagonia (3).jpg"] },
    { name: "TARTA DE FRUTILLAS", description: "Masa sablée con almendras, dulce de leche, crema y frutillas frescas. <br>IMPORTANTE: RESERVA SUJETA A DISPONIBILIDAD DE FRUTILLA FRESCA. <br>Rinde 15-20 porciones.", slicePrice: 8200, cakePrice: 49200, stockSlices: 24, stockCakes: 5, images: ["../assets/tarta-de-frutilla (1).jpg", "../assets/tarta-de-frutilla (2).jpg", "../assets/tarta-de-frutilla (3).jpg"] },
    { name: "NUGATON", description: "Base de chocolate y avena, mousse de chocolate blanco. <br>Rinde 15-20 porciones.", slicePrice: 8200, cakePrice: 49200, stockSlices: 24, stockCakes: 5, images: ["../assets/nugaton (1).jpg", "../assets/nugaton (2).jpg", "../assets/nugaton (3).jpg"] },
    { name: "BEGONIA", description: "Base de chocolate con trocitos de chocolate blanco, cremoso de chocolate semiamargo con frambuesas bañadas y mousse de limón. <br>Rinde 15-20 porciones.", slicePrice: 8600, cakePrice: 51600, stockSlices: 24, stockCakes: 5, images: ["../assets/begonia (1).jpg", "../assets/begonia (2).jpg", "../assets/begonia (3).jpg"] },
    { name: "HOPIE", description: "Torta helada en doble capa de vainilla y chocolate blanco, crema y maracuyá. <br>Rinde 15-20 porciones.", slicePrice: 8200, cakePrice: 49200, stockSlices: 24, stockCakes: 5, images: ["../assets/hopie (1).jpg", "../assets/hopie (2).jpg", "../assets/hopie (3).jpg"] },
    { name: "FRIDA", description: "Base de chocolate, cremoso de naranja, crema y frutas de estación. <br>Rinde 15-20 porciones.", slicePrice: 8200, cakePrice: 49200, stockSlices: 24, stockCakes: 5, images: ["../assets/frida (1).jpg", "../assets/frida (2).jpg", "../assets/frida (3).jpg"] },
    { name: "BLOCK", description: "Base de chocolate, dulce de leche con maní, cremoso de chocolate semiamargo, decorada con crema Bariloche y salsa de caramelo. <br>Rinde 15-20 porciones.", slicePrice: 8600, cakePrice: 51600, stockSlices: 24, stockCakes: 5, images: ["../assets/block (1).jpg", "../assets/block (2).jpg", "../assets/block (3).jpg"] },
    { name: "MANDI", description: "Base de chocolate con trocitos de chocolate con leche, mousse de frutillas y leche condensada, merengue italiano. <br>Rinde 15-20 porciones.", slicePrice: 8300, cakePrice: 48000, stockSlices: 24, stockCakes: 5, images: ["../assets/mandi (1).jpg", "../assets/mandi (2).jpg", "../assets/mandi (3).jpg"] },
    { name: "ISADORA", description: "Torta de ricota y limón, dulce de frambuesas y crumble con más frambuesas. <br>Rinde 15-20 porciones.", slicePrice: 8000, cakePrice: 48000, stockSlices: 24, stockCakes: 5, images: ["../assets/isadora (1).jpg", "../assets/isadora (2).jpg", "../assets/isadora (3).jpg"] },
    { name: "CHEESCAKE FRUTOS ROJOS", description: "Cheesecake New York con dulce de frutos rojos casero y frutos. <br>Rinde 15-20 porciones.", slicePrice: 8200, cakePrice: 49200, stockSlices: 24, stockCakes: 5, images: ["../assets/cheescake-frutos-rojos (1).jpg", "../assets/cheescake-frutos-rojos (2).jpg", "../assets/cheescake-frutos-rojos (3).jpg"] },
    { name: "MARQUISE CLASICA", description: "Torta de chocolate intenso sin harina, dulce de leche, crema chantilly y merengue italiano. <br>Rinde 15-20 porciones.", slicePrice: 7900, cakePrice: 47400, stockSlices: 24, stockCakes: 5, images: ["../assets/marquise-clasica (1).jpg", "../assets/marquise-clasica (2).jpg", "../assets/marquise-clasica (3).jpg"] },
    { name: "MAGNOLIA", description: "Bizcochuelo húmedo de vainilla, dulce de leche, duraznos, disco de merengue, decorada con cream cheese y maracuyá. <br>Rinde 15-20 porciones.", slicePrice: 7800, cakePrice: 46800, stockSlices: 24, stockCakes: 5, images: ["../assets/magnolia (1).jpg", "../assets/magnolia (2).jpg", "../assets/magnolia (3).jpg"] },
    { name: "OREO DOBLE", description: "Torta helada. Doble capa de oreo, dulce de leche y crema. <br>Rinde 15-20 porciones.", slicePrice: 8200, cakePrice: 49200, stockSlices: 24, stockCakes: 5, images: ["../assets/oreo-doble (1).jpg", "../assets/oreo-doble (2).jpg", "../assets/oreo-doble (3).jpg"] },
    { name: "AMBAR", description: "Base de chocolate, cremoso de limón y merengue italiano. <br>Rinde 15-20 porciones.", slicePrice: 7800, cakePrice: 46800, stockSlices: 24, stockCakes: 5, images: ["../assets/ambar (1).jpg", "../assets/ambar (2).jpg", "../assets/ambar (3).jpg"] },
    { name: "MARGOT", description: "Cheesecake de limón super cremoso, reducción de frutillas y crema chantilly. <br>Rinde 15-20 porciones.", slicePrice: 8300, cakePrice: 49800, stockSlices: 24, stockCakes: 5, images: ["../assets/margot (1).jpg", "../assets/margot (2).jpg", "../assets/margot (3).jpg"] },
    { name: "CHOCOTORTA", description: "Capas de cream cheese de dulce de leche intercaladas con galletitas de chocolate. <br>Rinde 15-20 porciones.", slicePrice: 8300, cakePrice: 49800, stockSlices: 24, stockCakes: 5, images: ["../assets/chocotorta (1).jpg", "../assets/chocotorta (2).jpg", "../assets/chocotorta (3).jpg"] },
    { name: "DOMINGA", description: "Bizcochuelo húmedo de chocolate, ganache de chocolate especiada con naranjas, dulce de leche con cacao. <br>Rinde 15-20 porciones.", slicePrice: 8500, cakePrice: 51000, stockSlices: 24, stockCakes: 5, images: ["../assets/dominga (1).jpg", "../assets/dominga (2).jpg", "../assets/dominga (3).jpg"] },
    { name: "AURORA", description: "Bizcochuelo húmedo de chocolate con dulce de leche, crema y frutos de estación. <br>Rinde 15-20 porciones.", slicePrice: 7800, cakePrice: 46800, stockSlices: 24, stockCakes: 5, images: ["../assets/aurora (1).jpg", "../assets/aurora (2).jpg", "../assets/aurora (3).jpg"] },
    { name: "POPURRI", description: "• CHEESECAKE: frutos rojos. <br>• ALASKA: cheesecake de chocolate blanco relleno de dulce de leche, cubierto con doble ganache de chocolate. <br>• BROWNIE CLÁSICO: nueces, dulce de leche, crema y merengue. <br>• MARGOT: cheesecake de limón, reducción de frutillas y crema chantilly. <br>• NUGATON: base de chocolate y avena, mousse de chocolate blanco. <br>• FRIDA: base de chocolate, cremoso de naranja con leche condensada, crema y frutas de estación.heesecake de limón super cremoso, reducción de frutillas y crema chantilly.", slicePrice: undefined, cakePrice: 18000, stockSlices: 0, stockCakes: 24, images: ["../assets/popurri (1).jpg", "../assets/popurri (2).jpg", "../assets/popurri (3).jpg"] },
    { name: "HOGAZA", description: "Mix de harina blanca y harina integral. Masa madre de centeno.", slicePrice: undefined, cakePrice: 4800, stockSlices: 0, stockCakes: 24, images: ["../assets/hogaza (1).jpg", "../assets/hogaza (2).jpg", "../assets/hogaza (3).jpg"] },
    { name: "PAN DE CAMPO", description: "Clásico a base de grasa y levadura.", slicePrice: undefined, cakePrice: 4000, stockSlices: 0, stockCakes: 24, images: ["../assets/pan-de-campo (1).jpg", "../assets/pan-de-campo (2).jpg", "../assets/pan-de-campo (3).jpg"] },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
    generateProducts();
    initializeStockWarnings();
    updateCart();
});

function generateProducts() {
    const container = document.getElementById("grid");
    if (!container) return; // Evita errores si no existe el elemento
    container.innerHTML = "";

    products.forEach((product, index) => {
        const cardClass = `card-${index + 1}`;
        const carouselId = `carousel-${product.name.replace(/\s+/g, '')}`;
        const imagesHTML = product.images.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="${product.name}">
            </div>
        `).join('');

        const sliceControlsHTML = product.slicePrice !== undefined ? `
            <p class="stock-warning-slices" style="display: none; color: red; font-weight: bold;">⚠️ Última porción en stock</p>
            <div class="count-controls">
                <button onclick="decrementSlices(this)">-1</button>
                <p>Porciones: $${product.slicePrice}</p>
                <button onclick="incrementSlices(this)">+1</button>
            </div>
            <div class="slice-count">
                <p>Porciones:</p> <span id="sliceCount">0</span>
            </div>
        ` : '';

        const productHTML = `
            <div class="${cardClass}" style="grid-area: ${cardClass};">
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
                        <button onclick="decrementCakes(this)">-1</button>
                        <p>Entera: $${product.cakePrice}</p>
                        <button onclick="incrementCakes(this)">+1</button>
                    </div>
                    <div class="cake-count">
                        <p>Entera:</p> <span id="cakeCount">0</span>
                    </div>
                    <div class="add-to-cart">
                        <button onclick="addToCart(this)">Agregar al carrito</button>
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

    let priceElements = card.querySelectorAll('.count-controls p');
    let slicePrice = priceElements.length > 1 ? parseFloat(priceElements[0].textContent.match(/\d+/)[0]) : 0;
    let cakePrice = priceElements.length > 1 ? parseFloat(priceElements[1].textContent.match(/\d+/)[0]) : parseFloat(priceElements[0].textContent.match(/\d+/)[0]);

    let sliceTotal = sliceCount * slicePrice;
    let cakeTotal = cakeCount * cakePrice;

    // Buscar el producto en el array
    let product = products.find(p => p.name === title);

    // Verificar si hay suficiente stock
    if (sliceCount > product.stockSlices) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `❌ No hay suficientes porciones de ${title}. Stock disponible: ${product.stockSlices}`,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });
        return;
    }

    if (cakeCount > product.stockCakes) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `❌ No hay suficientes tortas enteras de ${title}. Stock disponible: ${product.stockCakes}`,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });
        return;
    }

    // Descontar del stock
    product.stockSlices -= sliceCount;
    product.stockCakes -= cakeCount;

    // Actualizar visualmente la leyenda de "Última en stock"
    updateStockWarning(card, product);

    // Agregar al carrito si hay stock suficiente
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
                cakeTotal
            });
        }

        // Guardar el carrito en localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCart();

        // Resetear los contadores
        if (sliceSpan) sliceSpan.textContent = 0;
        if (cakeSpan) cakeSpan.textContent = 0;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '❌ Por favor, selecciona al menos una porción o una torta entera antes de agregar al carrito.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });
    }
}

function updateCart() {
    let cartContainer = document.getElementById('cart');
    if (!cartContainer) return; // Evita errores si no existe el elemento
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<li>El carrito está vacío</li>';
        updateCartCounter(0); // Actualizar el contador del carrito
        return;
    }

    cart.forEach((item, index) => {
        let listItem = document.createElement('li');
        let text = `${item.title} - `;

        if (item.sliceCount > 0) {
            text += `Porciones: ${item.sliceCount} ($${item.sliceTotal}) `;
            text += `<button class="btn-eliminar" onclick="removeSlices(${index})">Eliminar porciones</button>`;
        }

        if (item.cakeCount > 0) {
            text += `| Enteras: ${item.cakeCount} ($${item.cakeTotal})`;
            text += `<button class="btn-eliminar" onclick="removeCakes(${index})">Eliminar enteras</button>`;
        }

        listItem.innerHTML = text.trim(); // Usamos innerHTML para permitir los botones
        cartContainer.appendChild(listItem);
    });

    // Actualizar el contador del carrito
    let totalItems = cart.reduce((total, item) => total + item.sliceCount + item.cakeCount, 0);
    updateCartCounter(totalItems);
}

function removeSlices(index) {
    if (cart[index].sliceCount > 0) {
        cart[index].sliceCount--;
        cart[index].sliceTotal -= products.find(p => p.name === cart[index].title).slicePrice;
        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) {
            cart.splice(index, 1); // Eliminar el producto si no hay más porciones ni tortas enteras
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

function removeCakes(index) {
    if (cart[index].cakeCount > 0) {
        cart[index].cakeCount--;
        cart[index].cakeTotal -= products.find(p => p.name === cart[index].title).cakePrice;
        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) {
            cart.splice(index, 1); // Eliminar el producto si no hay más porciones ni tortas enteras
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

function updateCartCounter(totalItems) {
    let cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.textContent = `🛒 Ver Carrito (${totalItems})`;
    }
}

function removeSlices(index) {
    if (cart[index].sliceCount > 0) {
        cart[index].sliceCount--;
        cart[index].sliceTotal -= products.find(p => p.name === cart[index].title).slicePrice;
        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) {
            cart.splice(index, 1); // Eliminar el producto si no hay más porciones ni tortas enteras
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

function removeCakes(index) {
    if (cart[index].cakeCount > 0) {
        cart[index].cakeCount--;
        cart[index].cakeTotal -= products.find(p => p.name === cart[index].title).cakePrice;
        if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) {
            cart.splice(index, 1); // Eliminar el producto si no hay más porciones ni tortas enteras
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
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

function initializeStockWarnings() {
    document.querySelectorAll('.card-body').forEach(card => {
        let title = card.querySelector('.card-title').textContent;
        let product = products.find(p => p.name === title);
        if (product) {
            updateStockWarning(card, product);
        }
    });
}

function toggleCart() {
    let cartPanel = document.getElementById('cart-panel');
    if (!cartPanel) return; // Evita errores si no existe el elemento
    if (cartPanel.style.right === "0px") {
        cartPanel.style.right = "-350px"; // Ocultar
    } else {
        cartPanel.style.right = "0px"; // Mostrar
        updateCart(); // Actualizar carrito al abrir
    }
}

function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu carrito está vacío. Agrega productos antes de finalizar la compra.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        });
        return;
    }

    // Guardar carrito en localStorage para recuperarlo en pago.html
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirigir a la página de pago
    window.location.href = "pago.html";
}


// Manejo del formulario de pago (si existe)
const paymentForm = document.getElementById("payment-form");
if (paymentForm) {
    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        Swal.fire({
            icon: 'success',
            title: '¡Pedido confirmado!',
            text: 'Gracias por tu compra.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'btn btn-primary'
            }
        }).then(() => {
            localStorage.removeItem("cart"); // Vaciar el carrito
            window.location.href = "../index.html"; // Redirigir al inicio
        });
    });
}
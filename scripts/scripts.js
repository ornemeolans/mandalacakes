let stock = {
    "ALASKA": { slices: 24, cakes: 5 },
    "RUFINA": { slices: 24, cakes: 5 },
    "PATAGONIA": { slices: 24, cakes: 5 },
    "TARTA DE FRUTILLAS": { slices: 24, cakes: 5 },
    "NUGATON": { slices: 24, cakes: 5 },
    "BEGONIA": { slices: 24, cakes: 5 },
    "HOPIE": { slices: 24, cakes: 5 },
    "FRIDA": { slices: 24, cakes: 5 },
    "BLOCK": { slices: 24, cakes: 5 },
    "MANDI": { slices: 24, cakes: 5 },
    "ISADORA": { slices: 24, cakes: 5 },
    "CHEESCAKE FRUTOS ROJOS": { slices: 24, cakes: 5 },
    "MARQUISE CLASICA": { slices: 24, cakes: 5 },
    "MAGNOLIA": { slices: 24, cakes: 5 },
    "OREO DOBLE": { slices: 24, cakes: 5 },
    "AMBAR": { slices: 24, cakes: 5 },
    "MARGOT": { slices: 24, cakes: 5 },
    "CHOCOTORTA": { slices: 24, cakes: 5 },
    "DOMINGA": { slices: 24, cakes: 5 },
    "AURORA": { slices: 24, cakes: 5 },
    "POPURRI": { slices: 0, cakes: 10 },  // Solo se vende entera
    "HOGAZA": { slices: 0, cakes: 10 },
    "PAN DE CAMPO": { slices: 0, cakes: 10 }
};

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

let cart = [];

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

    // Verificar si hay suficiente stock
    if (sliceCount > stock[title].slices) {
        alert(`❌ No hay suficientes porciones de ${title}. Stock disponible: ${stock[title].slices}`);
        return;
    }
    
    if (cakeCount > stock[title].cakes) {
        alert(`❌ No hay suficientes tortas enteras de ${title}. Stock disponible: ${stock[title].cakes}`);
        return;
    }

    // Descontar del stock
    stock[title].slices -= sliceCount;
    stock[title].cakes -= cakeCount;

    // 🔥 Actualizar visualmente la leyenda de "Última en stock"
    updateStockWarning(card, title);

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

        updateCart();

        // Resetear los contadores
        if (sliceSpan) sliceSpan.textContent = 0;
        if (cakeSpan) cakeSpan.textContent = 0;
    } else {
        alert("❌ Por favor, selecciona al menos una porción o una torta entera antes de agregar al carrito.");
    }
}


function updateCart() {
    let cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<li>El carrito está vacío</li>';
        return;
    }

    cart.forEach(item => {
        let listItem = document.createElement('li');
        let text = `${item.title} - `;

        if (item.sliceCount > 0) {
            text += `Porciones: ${item.sliceCount} ($${item.sliceTotal}) `;
        }

        if (item.cakeCount > 0) {
            text += `| Enteras: ${item.cakeCount} ($${item.cakeTotal})`;
        }

        listItem.textContent = text.trim(); // Elimina espacios extra
        cartContainer.appendChild(listItem);
    });
}

function updateStockWarning(card, title) {
    let stockWarningSlices = card.querySelector('.stock-warning-slices');
    let stockWarningCakes = card.querySelector('.stock-warning-cakes');

    if (stock[title].slices === 1) {
        stockWarningSlices.style.display = "block"; // Mostrar "Última porción en stock"
    } else {
        stockWarningSlices.style.display = "none"; // Ocultar si hay más de una
    }

    if (stock[title].cakes === 1) {
        stockWarningCakes.style.display = "block"; // Mostrar "Última torta entera en stock"
    } else {
        stockWarningCakes.style.display = "none"; // Ocultar si hay más de una
    }
}

function initializeStockWarnings() {
    document.querySelectorAll('.card-body').forEach(card => {
        let title = card.querySelector('.card-title').textContent;
        updateStockWarning(card, title);
    });
}

// Ejecutar al cargar la página
window.onload = initializeStockWarnings;


function toggleCart() {
    let cartPanel = document.getElementById('cart-panel');
    if (cartPanel.style.right === "0px") {
        cartPanel.style.right = "-350px"; // Ocultar
    } else {
        cartPanel.style.right = "0px"; // Mostrar
        updateCart(); // Actualizar carrito al abrir
    }
}

function updateCart() {
    let cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<li>El carrito está vacío</li>';
        return;
    }

    cart.forEach(item => {
        let listItem = document.createElement('li');
        let text = `${item.title} - `;

        if (item.sliceCount > 0) {
            text += `Porciones: ${item.sliceCount} ($${item.sliceTotal}) `;
        }

        if (item.cakeCount > 0) {
            text += `| Enteras: ${item.cakeCount} ($${item.cakeTotal})`;
        }

        listItem.textContent = text.trim();
        cartContainer.appendChild(listItem);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.sliceTotal + item.cakeTotal, 0);
    alert(`Compra finalizada. Total a pagar: $${total}`);
    
    // Vaciar el carrito después de la compra
    cart = [];
    updateCart();
    toggleCart(); // Ocultar carrito
}

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const orderSummary = document.getElementById("order-summary");
        const totalPrice = document.getElementById("total-price");

        let total = 0;
        carrito.forEach(item => {
            let listItem = document.createElement("li");
            listItem.textContent = `${item.title} - `;

            if (item.sliceCount > 0) {
                listItem.textContent += `Porciones: ${item.sliceCount} ($${item.sliceTotal}) `;
            }

            if (item.cakeCount > 0) {
                listItem.textContent += `| Enteras: ${item.cakeCount} ($${item.cakeTotal})`;
            }

            orderSummary.appendChild(listItem);
            total += item.sliceTotal + item.cakeTotal;
        });

        totalPrice.textContent = total;

        // Manejar la confirmación del pedido
        document.getElementById("payment-form").addEventListener("submit", function(event) {
            event.preventDefault();
            alert("¡Pedido confirmado! Gracias por tu compra.");
            localStorage.removeItem("carrito"); // Vaciar el carrito después de la compra
            window.location.href = "../index.html"; // Redirigir al inicio
        });

function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    // Guardar carrito en localStorage para recuperarlo en pago.html
    localStorage.setItem("carrito", JSON.stringify(cart));

    // Redirigir a la página de pago
    window.location.href = "pago.html";
}
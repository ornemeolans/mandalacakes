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

    // Si no existen las etiquetas, asigna 0 por defecto
    let sliceCount = sliceSpan ? parseInt(sliceSpan.textContent) || 0 : 0;
    let cakeCount = cakeSpan ? parseInt(cakeSpan.textContent) || 0 : 0;

    // Obtener los precios desde los elementos <p>
    let priceElements = card.querySelectorAll('.count-controls p');
    let slicePrice = 0;
    let cakePrice = 0;

    if (priceElements.length === 2) {
        // Tarjetas que tienen porciones y enteras
        slicePrice = parseFloat(priceElements[0].textContent.match(/\d+/)[0]);
        cakePrice = parseFloat(priceElements[1].textContent.match(/\d+/)[0]);
    } else if (priceElements.length === 1) {
        // Tarjetas que solo tienen tortas enteras (ej. card-21, card-22, card-23)
        cakePrice = parseFloat(priceElements[0].textContent.match(/\d+/)[0]);
    }

    let sliceTotal = sliceCount * slicePrice;
    let cakeTotal = cakeCount * cakePrice;

    // Solo agrega al carrito si se ha seleccionado al menos 1 porción o 1 torta entera
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
    } else {
        alert("Por favor, selecciona al menos una porción o una torta entera antes de agregar al carrito.");
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
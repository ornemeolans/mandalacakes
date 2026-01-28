// Variable global para productos cargados de forma asíncrona
let productsData = []; 

// FUNCIÓN DE UTILIDAD: Centraliza el formato de precios
function formatPrice(price) {
    if (price === null || price === undefined) return "";
    return `$${price.toLocaleString('es-AR')}`;
}

// --- I. FUNCIONES AUXILIARES DE UTILIDAD ---

function saveClientData() {
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const telefonoInput = document.getElementById("telefono");
    
    if (nombreInput) localStorage.setItem("nombre", nombreInput.value);
    if (apellidoInput) localStorage.setItem("apellido", apellidoInput.value);
    if (telefonoInput) localStorage.setItem("telefono", telefonoInput.value);
}

function loadClientData() {
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const telefonoInput = document.getElementById("telefono");

    if (nombreInput && localStorage.getItem("nombre")) {
        nombreInput.value = localStorage.getItem("nombre");
    }
    if (apellidoInput && localStorage.getItem("apellido")) {
        apellidoInput.value = localStorage.getItem("apellido");
    }
    if (telefonoInput && localStorage.getItem("telefono")) {
        telefonoInput.value = localStorage.getItem("telefono");
    }
}

function eliminarCarritoSiExpirado() {
    const carrito = JSON.parse(localStorage.getItem("cart")) || [];
    const horaCreacionCarrito = localStorage.getItem("horaCreacionCarrito");

    if (carrito.length > 0 && horaCreacionCarrito) {
        const horaActual = new Date().getTime();
        const tiempoTranscurrido = horaActual - parseInt(horaCreacionCarrito, 10);

        if (tiempoTranscurrido > 3 * 60 * 60 * 1000) { // 3 horas
            localStorage.removeItem("cart");
            localStorage.removeItem("horaCreacionCarrito");
        }
    } else if (carrito.length > 0 && !horaCreacionCarrito) {
        localStorage.setItem("horaCreacionCarrito", new Date().getTime().toString());
    }
}

function getMinPickupDate() {
    const offsetBuenosAires = -180; // UTC-3 en minutos
    const fechaActual = new Date();
    const fechaBuenosAires = new Date(fechaActual.getTime() + (offsetBuenosAires * 60 * 1000) + (fechaActual.getTimezoneOffset() * 60000));
    return new Date(fechaBuenosAires.getTime() + 48 * 60 * 60 * 1000); 
}

function mostrarResumenPedido() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("order-summary");
    const orderSummaryMobile = document.getElementById("order-summary-mobile");
    const totalPedidoMobile = document.getElementById("total-pedido-mobile");
    const totalPedidoPanel = document.getElementById("total-pedido-panel");
    const totalPrice = document.getElementById("total-price");

    if (!orderSummary || !totalPrice) return;

    orderSummary.innerHTML = "";
    if(orderSummaryMobile) orderSummaryMobile.innerHTML = "";
    
    let total = 0;

    if (cart.length === 0) {
        orderSummary.innerHTML = "<li>No hay productos en el carrito.</li>";
    } else {
        cart.forEach(item => {
            const product = productsData.find(p => p.name === item.title);

            const baseItem = (isMobile) => {
                const li = document.createElement("li");
                // Estilos inline para asegurar compatibilidad con el nuevo diseño
                li.style.borderBottom = "1px solid #e499ba";
                li.style.padding = "10px 0";
                li.style.display = "flex";
                li.style.alignItems = "center";

                if (product && product.images && product.images.length > 0) {
                    const img = document.createElement("img");
                    img.src = product.images[0];
                    img.alt = item.title;
                    img.style.width = "60px";
                    img.style.height = "60px";
                    img.style.objectFit = "cover";
                    img.style.borderRadius = "10px";
                    img.style.marginRight = "15px";
                    li.appendChild(img);
                }
                
                let itemText = `<div><strong>${item.title}</strong><br>`;
                if (item.sliceCount > 0) itemText += `${item.sliceCount} porción(es) (${formatPrice(item.sliceTotal)}) <br>`;
                if (item.cakeCount > 0) itemText += `${item.cakeCount} entera(s) (${formatPrice(item.cakeTotal)})`;
                itemText += "</div>";
                
                const textDiv = document.createElement("div");
                textDiv.innerHTML = itemText;
                li.appendChild(textDiv);
                return li;
            };

            orderSummary.appendChild(baseItem(false));
            if(orderSummaryMobile) orderSummaryMobile.appendChild(baseItem(true));

            total += item.sliceTotal + item.cakeTotal;
        });
    }

    if(totalPedidoMobile) totalPedidoMobile.textContent = total;
    if(totalPedidoPanel) totalPedidoPanel.textContent = total;
    totalPrice.textContent = total;
}

function validarRetiro() {
    const paymentForm = document.getElementById("payment-form");
    const fechaRetiroInput = document.getElementById("fecha-retiro");
    const horaRetiroInput = document.getElementById("hora-retiro"); 
    const submitButton = paymentForm ? paymentForm.querySelector('button[type="submit"]') : null;

    if (!submitButton) return false;

    const sucursalSeleccionada = document.querySelector('input[name="pickup"]:checked');
    const fechaRetiroValue = fechaRetiroInput.value;
    const horaRetiroValue = horaRetiroInput.value;
    const fechaMinima = getMinPickupDate();

    // 0. Validación de campos obligatorios
    if (!sucursalSeleccionada || !fechaRetiroValue || !horaRetiroValue) {
        // No deshabilitamos, dejamos que el navegador valide los 'required'
        return false;
    }

    const isTakeAway = sucursalSeleccionada.value === "sucursal1";
    const ABRIR = 8;
    const CERRAR = isTakeAway ? 20 : 21; 
    const HORARIO_TEXTO = isTakeAway ? 'Lunes a Sábado de 8:00 a 20:00 hs.' : 'Lunes a Domingo de 8:00 a 21:00 hs.';

    const offsetBuenosAires = -180; 
    const now = new Date();
    const nowUTC3 = new Date(now.getTime() + (offsetBuenosAires * 60 * 1000) + (now.getTimezoneOffset() * 60000)); 
    const currentDay = nowUTC3.getDay(); 
    const currentHour = nowUTC3.getHours();
    const currentMinute = nowUTC3.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    const closingTimeInMinutes = CERRAR * 60;
    const openingTimeInMinutes = ABRIR * 60;
    
    // Validaciones de horario actual y fecha retiro (igual que original)
    if (isTakeAway && currentDay === 0) {
        Swal.fire({ title: '¡Local Cerrado! 🚫', text: `Take Away cerrado hoy. ${HORARIO_TEXTO}`, icon: "error", confirmButtonText: "Aceptar" });
        return false;
    }

    if (currentTimeInMinutes < openingTimeInMinutes || currentTimeInMinutes > closingTimeInMinutes) {
        Swal.fire({ title: '¡Local Cerrado! 😔', text: `Fuera de horario. ${HORARIO_TEXTO}`, icon: "error", confirmButtonText: "Aceptar" });
        return false;
    }
    
    const fechaHoraSeleccionada = new Date(`${fechaRetiroValue}T${horaRetiroValue}:00-03:00`); 
    const diaSemanaRetiro = fechaHoraSeleccionada.getDay();
    const horaRetiro = fechaHoraSeleccionada.getHours();
    const minutosRetiro = fechaHoraSeleccionada.getMinutes();
    const retiroTimeInMinutes = horaRetiro * 60 + minutosRetiro;

    const fechaMinimaConfirmacion = new Date(fechaMinima.getTime());
    if (fechaHoraSeleccionada.getTime() < fechaMinimaConfirmacion.getTime()) {
        Swal.fire({ text: "🚫 Debes seleccionar una fecha con al menos 48 horas de anticipación.", icon: "warning", confirmButtonText: "Aceptar" });
        return false;
    }

    if (isTakeAway && diaSemanaRetiro === 0) {
        Swal.fire({ text: "🚫 Take Away no permite retiros los domingos.", icon: "warning", confirmButtonText: "Aceptar" });
        return false;
    }

    if (retiroTimeInMinutes < openingTimeInMinutes) {
        Swal.fire({ text: `🚫 La hora es antes de la apertura (${ABRIR}:00 hs).`, icon: "warning", confirmButtonText: "Aceptar" });
        return false;
    }

    if (retiroTimeInMinutes > closingTimeInMinutes) {
        Swal.fire({ text: `🚫 La hora es posterior al cierre (${CERRAR}:00 hs).`, icon: "warning", confirmButtonText: "Aceptar" });
        return false;
    }
    
    return true;
}

// --- II. LÓGICA PRINCIPAL ---

function initializePageLogic() {
    const paymentForm = document.getElementById("payment-form");
    const fechaRetiroInput = document.getElementById("fecha-retiro");
    const horaRetiroInput = document.getElementById("hora-retiro"); 
    const sucursal1Radio = document.getElementById("sucursal1");
    const sucursal2Radio = document.getElementById("sucursal2");

    if (!paymentForm || !fechaRetiroInput || !horaRetiroInput || !sucursal1Radio || !sucursal2Radio) {
        return;
    }
    
    loadClientData();
    eliminarCarritoSiExpirado();
    mostrarResumenPedido(); 
    
    const fechaMinima = getMinPickupDate();
    fechaRetiroInput.min = fechaMinima.toISOString().split("T")[0];

    // Listeners
    fechaRetiroInput.addEventListener("change", validarRetiro);
    horaRetiroInput.addEventListener("change", validarRetiro);
    sucursal1Radio.addEventListener("change", validarRetiro);
    sucursal2Radio.addEventListener("change", validarRetiro);
    
    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validarRetiro()) {
            saveClientData();
            
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const telefono = document.getElementById("telefono").value;
            const metodoPago = document.querySelector('input[name="payment"]:checked').value;
            const sucursalElement = document.querySelector('input[name="pickup"]:checked');
            const sucursal = sucursalElement.value;
            const sucursalNombre = sucursal === "sucursal1" ? "Take Away (Obispo Salguero 479)" : "The Gula House (25 de Mayo 1332)";
            const fechaRetiro = fechaRetiroInput.value;
            const horaRetiro = horaRetiroInput.value;
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let total = 0;
            let mensaje = `¡Nuevo pedido!%0A%0A`;
            mensaje += `*Nombre:* ${nombre} ${apellido}%0A`;
            mensaje += `*Teléfono:* ${telefono}%0A`;
            mensaje += `*Método de pago:* ${metodoPago}%0A`;
            mensaje += `*Sucursal:* ${sucursalNombre}%0A`;
            mensaje += `*Fecha y Hora de Retiro:* ${fechaRetiro} ${horaRetiro}%0A%0A`;
            mensaje += `*Detalles del pedido:*%0A`;

            cart.forEach(item => {
                if (item.sliceCount > 0) mensaje += `- ${item.title}: ${item.sliceCount} porción(es) (${formatPrice(item.sliceTotal)})%0A`;
                if (item.cakeCount > 0) mensaje += `- ${item.title}: ${item.cakeCount} torta(s) entera(s) (${formatPrice(item.cakeTotal)})`;
                total += item.sliceTotal + item.cakeTotal;
            });

            mensaje += `%0A*Total:* ${formatPrice(total)}`;

            const numeroWhatsApp = sucursal === "sucursal1" ? "3517657602" : "3512106878";
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
            window.open(urlWhatsApp, "_blank");

            Swal.fire({
                text: "¡Compra confirmada! Serás redirigido a WhatsApp para finalizar.",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: { confirmButton: "btn btn-primary" }
            }).then(() => {
                localStorage.removeItem("cart");
                localStorage.removeItem("horaCreacionCarrito");
                window.location.href = "../index.html";
            });
        }
    });
}

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
    fetch('../productos.json')
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return response.json();
        })
        .then(products => {
            productsData = products;
            initializePageLogic();
        })
        .catch(error => console.error("Error al cargar productos:", error));
});

window.mostrarResumenPedido = mostrarResumenPedido;
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

document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.getElementById("payment-form");
    const fechaRetiroInput = document.getElementById("fecha-retiro");
    const sucursal1Radio = document.getElementById("sucursal1");
    const sucursal2Radio = document.getElementById("sucursal2");
    const orderSummary = document.getElementById("order-summary");
    const totalPrice = document.getElementById("total-price");

    // Definir el botón de envío del formulario
    const submitButton = paymentForm.querySelector('button[type="submit"]');

    if (!paymentForm || !fechaRetiroInput || !sucursal1Radio || !sucursal2Radio || !orderSummary || !totalPrice || !submitButton) {
        return;
    }

    // Función para eliminar el carrito si ha pasado más de 3 horas
    function eliminarCarritoSiExpirado() {
        const carrito = JSON.parse(localStorage.getItem("cart")) || [];
        const horaCreacionCarrito = localStorage.getItem("horaCreacionCarrito");

        if (carrito.length > 0 && horaCreacionCarrito) {
            const horaActual = new Date().getTime();
            const tiempoTranscurrido = horaActual - parseInt(horaCreacionCarrito, 10);

            // 3 horas en milisegundos (3 * 60 * 60 * 1000)
            if (tiempoTranscurrido > 3 * 60 * 60 * 1000) {
                localStorage.removeItem("cart");
                localStorage.removeItem("horaCreacionCarrito");
            }
        }
    }

    // Verificar y eliminar el carrito si ha expirado
    eliminarCarritoSiExpirado();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Si el carrito está vacío, establecer la hora de creación
    if (cart.length === 0) {
        localStorage.setItem("horaCreacionCarrito", new Date().getTime().toString());
    }

    // Llamar a la función al cargar la página
    mostrarResumenPedido();

    // Event listener para el botón de desplegar el resumen del pedido
    const toggleOrderSummaryButton = document.getElementById("toggle-order-summary");
    const orderSummaryPanel = document.getElementById("order-summary-panel");

    if (toggleOrderSummaryButton && orderSummaryPanel) {
        toggleOrderSummaryButton.addEventListener("click", function () {
            orderSummaryPanel.classList.toggle("active");
            mostrarResumenPedido(); // Asegurar que siempre muestra los datos actualizados
        });
    }

    function validarFechaRetiro() {
        const fechaSeleccionada = new Date(fechaRetiroInput.value + "T00:00:00-03:00"); // Fecha en UTC-3 (Buenos Aires)
        const diaSemana = fechaSeleccionada.getDay(); // Día de la semana (0 = domingo, 1 = lunes, etc.)
        const horaSeleccionada = fechaSeleccionada.getHours(); // Hora en UTC-3
    
        const fechaActual = new Date(); // Fecha y hora actual en la zona horaria local
        const fechaMinima = new Date(fechaActual.getTime() + 48 * 60 * 60 * 1000); // 48 horas de anticipación
        const horaActual = fechaActual.getHours();
        const diaSemanaActual = fechaActual.getDay();
    
        // Validar si la sucursal 1 está cerrada los domingos
        if (sucursal1Radio.checked && diaSemana === 0) { // 0 es domingo
            Swal.fire({
                text: "🚫 Los domingos la sucursal Take Away se encuentra cerrada. Si lo necesitas para ese día, selecciona The Gula House.",
                icon: "warning",
                buttonsStyling: false,
                confirmButtonText: "Aceptar",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });
            submitButton.disabled = true;
            return false;
        }
    
        // Validar el horario de atención según la sucursal seleccionada
        if (sucursal1Radio.checked) {
            // Sucursal 1: Horario de 8:00 a 20:00 hs
            if (horaActual < 8 || horaActual >= 20 || diaSemanaActual === 0) {
                Swal.fire({
                    text: "🚫 El horario de atención de la sucursal Take Away es de Lunes a Sábado de 8:00 a 20:00 hs.",
                    icon: "warning",
                    buttonsStyling: false,
                    confirmButtonText: "Aceptar",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
                submitButton.disabled = true;
                return false;
            }
        } else if (sucursal2Radio.checked) {
            // Sucursal 2: Horario de 8:00 a 21:00 hs
            if (horaActual < 8 || horaActual >= 21) {
                Swal.fire({
                    text: "🚫 El horario de atención de la sucursal The Gula House es de 8:00 a 21:00 hs.",
                    icon: "warning",
                    buttonsStyling: false,
                    confirmButtonText: "Aceptar",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
                submitButton.disabled = true;
                return false;
            }
        }
    
        // Validar que la fecha de retiro sea al menos 48 horas después de la fecha actual
        if (fechaSeleccionada < fechaMinima) {
            Swal.fire({
                text: "🚫 Debes seleccionar una fecha con al menos 48 horas de anticipación.",
                icon: "warning",
                buttonsStyling: false,
                confirmButtonText: "Aceptar",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });
            submitButton.disabled = true;
            return false;
        }
    
        // Si todas las validaciones pasan, habilitar el botón de confirmar
        submitButton.disabled = false;
        return true;
    }

    const fechaActual = new Date();
    const offsetBuenosAires = -180;
    const fechaBuenosAires = new Date(fechaActual.getTime() + (offsetBuenosAires + fechaActual.getTimezoneOffset()) * 60000);
    const fechaMinima = new Date(fechaBuenosAires.getTime() + 48 * 60 * 60 * 1000);
    const fechaMinimaUTC = new Date(fechaMinima.getTime() - offsetBuenosAires * 60000);
    fechaRetiroInput.min = fechaMinimaUTC.toISOString().split("T")[0];

    fechaRetiroInput.addEventListener("change", validarFechaRetiro);
    sucursal1Radio.addEventListener("change", validarFechaRetiro);
    sucursal2Radio.addEventListener("change", validarFechaRetiro);

    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (validarFechaRetiro()) {
            // Obtener los datos del formulario
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const telefono = document.getElementById("telefono").value;
            const metodoPago = document.querySelector('input[name="payment"]:checked').value;
            const sucursal = document.querySelector('input[name="pickup"]:checked').value;
            const fechaRetiro = fechaRetiroInput.value;

            // Construir el mensaje de WhatsApp
            let mensaje = `¡Nuevo pedido!%0A%0A`;
            mensaje += `*Nombre:* ${nombre} ${apellido}%0A`;
            mensaje += `*Teléfono:* ${telefono}%0A`;
            mensaje += `*Método de pago:* ${metodoPago}%0A`;
            mensaje += `*Fecha de retiro:* ${fechaRetiro}%0A`;
            mensaje += `*Sucursal:* ${sucursal === "sucursal1" ? "Take Away (Obispo Salguero 479)" : "The Gula House (25 de Mayo 1332)"}%0A%0A`;
            mensaje += `*Detalles del pedido:*%0A`;

            cart.forEach(item => {
                if (item.sliceCount > 0) {
                    mensaje += `- ${item.title}: ${item.sliceCount} porción(es) ($${item.sliceTotal})%0A`;
                }
                if (item.cakeCount > 0) {
                    mensaje += `- ${item.title}: ${item.cakeCount} torta(s) entera(s) ($${item.cakeTotal})%0A`;
                }
            });

            mensaje += `%0A*Total:* $${totalPrice.textContent}`;

            // Determinar el número de WhatsApp según la sucursal
            const numeroWhatsApp = sucursal === "sucursal1" ? "3517326453" : "3516431879";

            // Abrir WhatsApp con el mensaje predefinido
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
            window.open(urlWhatsApp, "_blank");

            // Mostrar la alerta de confirmación
            Swal.fire({
                text: "¡Compra confirmada exitosamente!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Aceptar",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            }).then(() => {
                // Limpiar el carrito y redirigir al usuario
                localStorage.removeItem("cart");
                localStorage.removeItem("horaCreacionCarrito");
                window.location.href = "../index.html";
            });
        }
    });

    validarFechaRetiro();
});

function mostrarResumenPedido() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("order-summary");
    const orderSummaryMobile = document.getElementById("order-summary-mobile");
    const totalPedidoMobile = document.getElementById("total-pedido-mobile");
    const totalPedidoPanel = document.getElementById("total-pedido-panel");
    const totalPrice = document.getElementById("total-price");

    if (!orderSummary || !orderSummaryMobile || !totalPedidoMobile || !totalPedidoPanel || !totalPrice) {
        console.error("Faltan elementos en pago.html. Verifica los IDs.");
        return;
    }

    orderSummary.innerHTML = "";
    orderSummaryMobile.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        orderSummary.innerHTML = "<li>No hay productos en el carrito.</li>";
        orderSummaryMobile.innerHTML = "<li>No hay productos en el carrito.</li>";
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.name === item.title);

            // Crear el elemento del pedido para escritorio
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";

            // Mostrar la imagen del producto en escritorio
            if (product && product.images && product.images.length > 0) {
                const img = document.createElement("img");
                img.src = product.images[0];
                img.alt = item.title;
                img.style.width = "100px";
                img.style.height = "auto";
                img.style.marginRight = "10px";
                listItem.appendChild(img);
            }

            // Mostrar los detalles del producto en escritorio
            let itemText = `${item.title} - `;
            if (item.sliceCount > 0) {
                itemText += `${item.sliceCount} porción(es) ($${item.sliceTotal}) `;
            }
            if (item.cakeCount > 0) {
                itemText += `${item.cakeCount} torta(s) entera(s) ($${item.cakeTotal})`;
            }
            listItem.appendChild(document.createTextNode(itemText));
            orderSummary.appendChild(listItem);

            // Crear el elemento del pedido para móvil
            const listItemMobile = document.createElement("li");
            listItemMobile.className = "list-group-item";

            // Mostrar la imagen del producto en móvil
            if (product && product.images && product.images.length > 0) {
                const imgMobile = document.createElement("img");
                imgMobile.src = product.images[0];
                imgMobile.alt = item.title;
                imgMobile.style.width = "80px"; // Ajusta el tamaño para móvil
                imgMobile.style.height = "auto";
                imgMobile.style.marginRight = "10px";
                listItemMobile.appendChild(imgMobile);
            }

            // Mostrar los detalles del producto en móvil
            let itemTextMobile = `${item.title} - `;
            if (item.sliceCount > 0) {
                itemTextMobile += `${item.sliceCount} porción(es) ($${item.sliceTotal}) `;
            }
            if (item.cakeCount > 0) {
                itemTextMobile += `${item.cakeCount} torta(s) entera(s) ($${item.cakeTotal})`;
            }
            listItemMobile.appendChild(document.createTextNode(itemTextMobile));
            orderSummaryMobile.appendChild(listItemMobile);

            total += item.sliceTotal + item.cakeTotal;
        });
    }

    totalPedidoMobile.textContent = total;
    totalPedidoPanel.textContent = total;
    totalPrice.textContent = total;
}


const toggleOrderSummaryButton = document.getElementById("toggle-order-summary");
const orderSummaryPanel = document.getElementById("order-summary-panel");

toggleOrderSummaryButton.addEventListener("click", function () {

    if (orderSummaryPanel.className.includes("active")) {
        orderSummaryPanel.className = orderSummaryPanel.className.replace("active", "").trim();
        orderSummaryPanel.style.display = "none"; // Ocultar el panel
    } else {
        orderSummaryPanel.className += " active";
        orderSummaryPanel.style.display = "block"; // Mostrar el panel
    }

    mostrarResumenPedido();
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleOrderSummaryButton = document.getElementById("toggle-order-summary");
    const orderSummaryPanel = document.getElementById("order-summary-panel");

    if (!toggleOrderSummaryButton || !orderSummaryPanel) {
        return;
    }

    // Asegurar que el panel inicia oculto
    orderSummaryPanel.classList.remove("active");
    orderSummaryPanel.style.display = "none"; // Ocultarlo al inicio

    toggleOrderSummaryButton.addEventListener("click", function () {

        if (orderSummaryPanel.classList.contains("active")) {
            orderSummaryPanel.classList.remove("active");
            orderSummaryPanel.style.display = "none"; // Forzar ocultar
        } else {
            orderSummaryPanel.classList.add("active");
            orderSummaryPanel.style.display = "block"; // Forzar mostrar
        }

        mostrarResumenPedido();
    });
});


document.getElementById("order-summary-panel").classList;
document.getElementById("order-summary-panel").classList.add("active");

document.getElementById("order-summary-panel").style.display = "block";



function checkScreenSize() {
    if (window.innerWidth <= 767) {
        toggleOrderSummaryButton.style.display = "block";
    } else {
        toggleOrderSummaryButton.style.display = "none";
    }
}
checkScreenSize();
window.addEventListener("resize", checkScreenSize);
document.addEventListener("DOMContentLoaded", function () {
    mostrarResumenPedido();
});

window.mostrarResumenPedido = mostrarResumenPedido;

document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.getElementById("payment-form");
    const fechaRetiroInput = document.getElementById("fecha-retiro");
    const sucursal1Radio = document.getElementById("sucursal1");
    const sucursal2Radio = document.getElementById("sucursal2");
    const orderSummary = document.getElementById("order-summary");
    const totalPrice = document.getElementById("total-price");

    if (!paymentForm || !fechaRetiroInput || !sucursal1Radio || !sucursal2Radio || !orderSummary || !totalPrice) {
        console.error("Faltan elementos en el DOM. Revisa los IDs.");
        return;
    }

    // Función para eliminar el carrito si ha pasado más de 3 horas
    function eliminarCarritoSiExpirado() {
        const carrito = JSON.parse(localStorage.getItem("cart")) || [];
        const horaCreacionCarrito = localStorage.getItem("horaCreacionCarrito");

        if (carrito.length > 0 && horaCreacionCarrito) {
            const horaActual = new Date().getTime();
            const tiempoTranscurrido = horaActual - parseInt(horaCreacionCarrito, 10);

            // 3 horas en milisegundos (12 * 60 * 60 * 1000)
            if (tiempoTranscurrido > 3 * 60 * 60 * 1000) {
                localStorage.removeItem("cart");
                localStorage.removeItem("horaCreacionCarrito");
                console.log("El carrito ha sido eliminado por inactividad.");
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

    const products = [
        { name: "ALASKA", images: ["../assets/alaska (1).jpg", "../assets/alaska (2).jpg", "../assets/alaska (3).jpg"] },
        { name: "RUFINA", images: ["../assets/rufina (1).jpg", "../assets/rufina (2).jpg", "../assets/rufina (3).jpg"] },
        { name: "PATAGONIA", images: ["../assets/patagonia (1).jpg", "../assets/patagonia (2).jpg", "../assets/patagonia (3).jpg"] },
        { name: "TARTA DE FRUTILLAS", images: ["../assets/tarta-de-frutilla (1).jpg", "../assets/tarta-de-frutilla (2).jpg", "../assets/tarta-de-frutilla (3).jpg"] },
        { name: "NUGATON", images: ["../assets/nugaton (1).jpg", "../assets/nugaton (2).jpg", "../assets/nugaton (3).jpg"] },
        { name: "BEGONIA", images: ["../assets/begonia (1).jpg", "../assets/begonia (2).jpg", "../assets/begonia (3).jpg"] },
        { name: "HOPIE", images: ["../assets/hopie (1).jpg", "../assets/hopie (2).jpg", "../assets/hopie (3).jpg"] },
        { name: "FRIDA", images: ["../assets/frida (1).jpg", "../assets/frida (2).jpg", "../assets/frida (3).jpg"] },
        { name: "BLOCK", images: ["../assets/block (1).jpg", "../assets/block (2).jpg", "../assets/block (3).jpg"] },
        { name: "MANDI", images: ["../assets/mandi (1).jpg", "../assets/mandi (2).jpg", "../assets/mandi (3).jpg"] },
        { name: "ISADORA", images: ["../assets/isadora (1).jpg", "../assets/isadora (2).jpg", "../assets/isadora (3).jpg"] },
        { name: "CHEESCAKE FRUTOS ROJOS", images: ["../assets/cheescake-frutos-rojos (1).jpg", "../assets/cheescake-frutos-rojos (2).jpg", "../assets/cheescake-frutos-rojos (3).jpg"] },
        { name: "MARQUISE CLASICA", images: ["../assets/marquise-clasica (1).jpg", "../assets/marquise-clasica (2).jpg", "../assets/marquise-clasica (3).jpg"] },
        { name: "MAGNOLIA", images: ["../assets/magnolia (1).jpg", "../assets/magnolia (2).jpg", "../assets/magnolia (3).jpg"] },
        { name: "OREO DOBLE", images: ["../assets/oreo-doble (1).jpg", "../assets/oreo-doble (2).jpg", "../assets/oreo-doble (3).jpg"] },
        { name: "AMBAR", images: ["../assets/ambar (1).jpg", "../assets/ambar (2).jpg", "../assets/ambar (3).jpg"] },
        { name: "MARGOT", images: ["../assets/margot (1).jpg", "../assets/margot (2).jpg", "../assets/margot (3).jpg"] },
        { name: "CHOCOTORTA", images: ["../assets/chocotorta (1).jpg", "../assets/chocotorta (2).jpg", "../assets/chocotorta (3).jpg"] },
        { name: "DOMINGA", images: ["../assets/dominga (1).jpg", "../assets/dominga (2).jpg", "../assets/dominga (3).jpg"] },
        { name: "AURORA", images: ["../assets/aurora (1).jpg", "../assets/aurora (2).jpg", "../assets/aurora (3).jpg"] },
        { name: "POPURRI", images: ["../assets/popurri (1).jpg", "../assets/popurri (2).jpg", "../assets/popurri (3).jpg"] },
        { name: "HOGAZA", images: ["../assets/hogaza (1).jpg", "../assets/hogaza (2).jpg", "../assets/hogaza (3).jpg"] },
        { name: "PAN DE CAMPO", images: ["../assets/pan-de-campo (1).jpg", "../assets/pan-de-campo (2).jpg", "../assets/pan-de-campo (3).jpg"] },
    ];

    function mostrarResumenPedido() {
        orderSummary.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            orderSummary.innerHTML = "<li>No hay productos en el carrito.</li>";
        } else {
            cart.forEach((item, index) => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";

                const product = products.find(p => p.name === item.title);

                if (product && product.images && product.images.length > 0) {
                    const img = document.createElement("img");
                    img.src = product.images[0];
                    img.alt = item.title;
                    img.style.width = "100px";
                    img.style.height = "auto";
                    img.style.marginRight = "10px";
                    listItem.appendChild(img);
                }

                let text = `${item.title} - `;

                if (item.sliceCount > 0) {
                    text += `Porciones: ${item.sliceCount} ($${item.sliceTotal}) `;
                    const removeSliceButton = document.createElement("button");
                    removeSliceButton.textContent = "Eliminar porción";
                    removeSliceButton.className = "btn-eliminar";
                    removeSliceButton.onclick = () => eliminarPorcion(index);
                    listItem.appendChild(removeSliceButton);
                }

                if (item.cakeCount > 0) {
                    text += `| Enteras: ${item.cakeCount} ($${item.cakeTotal})`;
                    const removeCakeButton = document.createElement("button");
                    removeCakeButton.textContent = "Eliminar torta";
                    removeCakeButton.className = "btn-eliminar";
                    removeCakeButton.onclick = () => eliminarTorta(index);
                    listItem.appendChild(removeCakeButton);
                }

                listItem.appendChild(document.createTextNode(text.trim()));
                orderSummary.appendChild(listItem);

                total += item.sliceTotal + item.cakeTotal;
            });
        }

        totalPrice.textContent = total;
    }

    function eliminarPorcion(index) {
        if (cart[index].sliceCount > 0) {
            cart[index].sliceCount -= 1;
            cart[index].sliceTotal = cart[index].sliceCount * (cart[index].sliceTotal / (cart[index].sliceCount + 1));
            if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            mostrarResumenPedido();
        }
    }

    function eliminarTorta(index) {
        if (cart[index].cakeCount > 0) {
            cart[index].cakeCount -= 1;
            cart[index].cakeTotal = cart[index].cakeCount * (cart[index].cakeTotal / (cart[index].cakeCount + 1));
            if (cart[index].sliceCount === 0 && cart[index].cakeCount === 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            mostrarResumenPedido();
        }
    }

    mostrarResumenPedido();

    const submitButton = paymentForm.querySelector('button[type="submit"]');

    function validarFechaRetiro() {
        const fechaSeleccionadaUTC = new Date(fechaRetiroInput.value + "T00:00:00Z");
        const offsetBuenosAires = -180;
        const fechaSeleccionada = new Date(fechaSeleccionadaUTC.getTime() + offsetBuenosAires * 60000);
        const diaSemana = fechaSeleccionada.getDay();

        const fechaActual = new Date();
        const fechaBuenosAires = new Date(fechaActual.getTime() + (offsetBuenosAires + fechaActual.getTimezoneOffset()) * 60000);
        const fechaMinima = new Date(fechaBuenosAires.getTime() + 48 * 60 * 60 * 1000);

        if (sucursal1Radio.checked && diaSemana === 6) {
            Swal.fire({
                text: "🚫 Los domingos la sucursal se encuentra cerrada. Si lo necesitas para ese día selecciona The Gula House.",
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

        const horaBuenosAires = fechaSeleccionada.getHours();
        if (horaBuenosAires < 8 || horaBuenosAires > 20) {
            Swal.fire({
                text: "🚫 Hace tu pedido dentro del horario de atención que es de 8:00 a 20:00hs.",
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
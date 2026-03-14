# Mandala Cakes | Pastelería Artesanal 🍰

**Mandala Cakes** es una plataforma de e-commerce diseñada para una pastelería artesanal en Córdoba, Argentina. El sitio permite a los usuarios explorar un catálogo de productos dulces, gestionar un carrito de compras y concretar pedidos de manera eficiente.

## 🚀 Funcionalidades
- **Tienda Dinámica**: Visualización de productos cargados dinámicamente desde un archivo JSON.
- **Carrito de Compras**: Gestión de pedidos en tiempo real con persistencia de datos.
- **Sistema de Pagos**: Interfaz dedicada para la gestión y confirmación de transacciones.
- **Diseño Atractivo**: Estética visual cuidada que resalta la calidad artesanal de los productos, con animaciones fluidas.
- **Navegación Intuitiva**: Secciones claras para conocer la historia de la marca ("Nosotros") y canales de contacto.

## 🛠️ Tecnologías Utilizadas
El desarrollo se enfocó en crear una experiencia de usuario robusta utilizando tecnologías modernas de frontend:

- **HTML5 & CSS3**: Estructura semántica y estilos personalizados para una identidad de marca única.
- **JavaScript (Vanilla)**: Lógica principal para la gestión del carrito, servicios de productos y animaciones.
- **Arquitectura Modular**: Organización del código en scripts especializados (`productService.js`, `tienda.js`, `pago.js`) para facilitar el mantenimiento.
- **JSON**: Utilizado como base de datos local para la gestión de productos y precios.

## ⚙️ Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ornemeolans/mandalacakes.git
2. **Navegar al directorio:**
   ```bash
   cd mandalacakes
3. **Ejecución:**
  Utiliza módulos de JS y carga un archivo `productos.json` mediante fetch.
  Utiliza Live Server en VS Code o cualquier servidor HTTP local para garantizar que el `productService.js` funcione correctamente y el carrito persista los datos.

## 📂 Estructura del Proyecto
```text
/
├── assets/         # Imágenes de productos, banners y logotipos
├── css/            # Hojas de estilo personalizadas
├── pages/          # Vistas de Tienda, Nosotros, Pago y Contacto
├── scripts/        # Lógica modular (Animaciones, Carrito, Servicios)
├── productos.json  # Catálogo dinámico de pastelería
└── index.html      # Página de bienvenida (Hero)

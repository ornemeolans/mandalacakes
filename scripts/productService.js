/**
 * Capa de Servicio para Productos
 * Este archivo actúa como puente entre la UI y los datos.
 * Actualmente lee del JSON local, pero puede conectarse a una API externa.
 * 
 * Para conectar a una base de datos en el futuro:
 * 1. Cambiar la constante USE_API a true
 * 2. Configurar API_URL con el endpoint de tu API
 * 3. El sistema automáticamente usará fetch en lugar del JSON local
 */

// Configuración de la fuente de datos
const CONFIG = {
    // Cambiar a true cuando tengas una API externa
    USE_API: false,
    
    // URL de tu API cuando USE_API sea true
    API_URL: 'https://api.mandalacakes.com.ar/v1',
    
    // Fuente de datos local (JSON)
    LOCAL_DATA_PATH: '../productos.json',
    
    // Endpoint de stock (para validación en tiempo real)
    STOCK_API_URL: 'https://api.mandalacakes.com.ar/v1/stock',
    
    // Habilitar validación de stock en tiempo real (requiere API)
    ENABLE_REALTIME_STOCK: false,
    
    // Timeout para requests en ms
    API_TIMEOUT: 5000
};

// Sucursales disponibles
const SUCURSALES = {
    takeAway: { id: 'sucursal1', nombre: 'Take Away', direccion: 'Obispo Salguero 479' },
    gulaHouse: { id: 'sucursal2', nombre: 'The Gula House', direccion: '25 de Mayo 1332' }
};

/**
 * Servicio principal de productos
 */
const ProductService = {
    /**
     * Obtiene todos los productos disponibles
     * @returns {Promise<Array>} Array de productos
     */
    async getProducts() {
        try {
            let products;
            
            if (CONFIG.USE_API) {
                products = await this.fetchFromAPI('/productos');
            } else {
                products = await this.fetchFromLocalJSON();
            }
            
            // Filtrar productos disponibles
            return products.filter(p => p.disponible !== false);
            
        } catch (error) {
            console.error('Error obteniendo productos:', error);
            throw error;
        }
    },

    /**
     * Obtiene el stock de un producto específico
     * @param {number|string} productId - ID o SKU del producto
     * @param {string} sucursal - ID de la sucursal (takeAway o gulaHouse)
     * @returns {Promise<Object>} Objeto con stock por sucursal
     */
    async getStock(productId, sucursal = 'takeAway') {
        if (CONFIG.ENABLE_REALTIME_STOCK && CONFIG.USE_API) {
            try {
                const response = await this.fetchFromAPI(`/stock/${productId}?sucursal=${sucursal}`);
                return response;
            } catch (error) {
                console.warn('Error obteniendo stock en tiempo real, usando local:', error);
                return null;
            }
        }
        return null; // Usar stock local
    },

    /**
     * Valida el stock antes de agregar al carrito
     * @param {Object} product - Producto a validar
     * @param {number} cantidad - Cantidad a comprar
     * @param {string} tipo - 'slice' o 'cake'
     * @param {string} sucursal - ID de sucursal
     * @returns {Promise<boolean>} true si hay stock disponible
     */
    async validarStock(product, cantidad, tipo, sucursal = 'takeAway') {
        // Si no hay API, usar validación local
        if (!CONFIG.ENABLE_REALTIME_STOCK || !CONFIG.USE_API) {
            const stockKey = tipo === 'slice' ? 'stockSlices' : 'stockCakes';
            return product[stockKey] >= cantidad;
        }

        try {
            const stockData = await this.getStock(product.id || product.sku, sucursal);
            if (!stockData) return true; // Fallback a local
            
            const stockKey = tipo === 'slice' ? 'porciones' : 'enteras';
            return stockData[sucursal]?.[stockKey] >= cantidad;
            
        } catch (error) {
            console.warn('Error validando stock:', error);
            return true; // Permitir en caso de error
        }
    },

    /**
     * Consulta a la API externa
     * @param {string} endpoint - Endpoint de la API
     * @returns {Promise<any>} Respuesta de la API
     */
    async fetchFromAPI(endpoint) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT);

        try {
            const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            return await response.json();
        } finally {
            clearTimeout(timeoutId);
        }
    },

    /**
     * Lee el JSON local (funcionamiento actual)
     * @returns {Promise<Array>} Array de productos
     */
    async fetchFromLocalJSON() {
        const response = await fetch(CONFIG.LOCAL_DATA_PATH);
        
        if (!response.ok) {
            throw new Error(`Error loading local data: ${response.status}`);
        }
        
        return await response.json();
    },

    /**
     * Obtiene productos por categoría
     * @param {string} category - Nombre de la categoría
     * @returns {Promise<Array>} Productos filtrados
     */
    async getProductsByCategory(category) {
        const products = await this.getProducts();
        
        if (category === 'all') return products;
        
        return products.filter(p => p.category === category);
    },

    /**
     * Busca productos por nombre
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Promise<Array>} Productos que coinciden
     */
    async searchProducts(searchTerm) {
        const products = await this.getProducts();
        const term = searchTerm.toLowerCase();
        
        return products.filter(p => 
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            (p.sku && p.sku.toLowerCase().includes(term))
        );
    },

    /**
     * Obtiene un producto por ID o SKU
     * @param {number|string} id - ID o SKU del producto
     * @returns {Promise<Object|null>} Producto encontrado o null
     */
    async getProductById(id) {
        const products = await this.getProducts();
        
        return products.find(p => 
            p.id === id || 
            p.sku === id ||
            p.name === id
        ) || null;
    }
};

/**
 * Ejemplo de cómo sería la validación con webhook en el futuro:
 * 
 * async function validarStockConWebhook(producto, cantidad, tipo) {
 *     // Este código estaría en addToCart cuando ENABLE_REALTIME_STOCK = true
 *     
 *     try {
 *         const response = await fetch('https://tu-sistema-facturacion.com/webhook/stock', {
 *             method: 'POST',
 *             headers: { 'Content-Type': 'application/json' },
 *             body: JSON.stringify({
 *                 sku: producto.sku,
 *                 cantidad: cantidad,
 *                 tipo: tipo,
 *                 sucursal: localStorage.getItem('sucursalSeleccionada')
 *             })
 *         });
 *         
 *         const data = await response.json();
 *         return data.disponible; // true o false
 *     } catch (error) {
 *         console.error('Error validando stock:', error);
 *         return true; // Permitir si hay error de conexión
 *     }
 * }
 */

// Hacer disponible globalmente
window.ProductService = ProductService;
window.SUCURSALES = SUCURSALES;
window.PRODUCT_CONFIG = CONFIG;


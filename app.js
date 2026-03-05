// Product Data
const products = {
    1: {
        id: 1,
        title: "Premium Wireless Headphones",
        price: 129.99,
        stock: 15,
        description: "Experience exceptional sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for extended listening sessions. Perfect for music lovers and professionals who demand the best audio experience.",
        images: [
            "https://via.placeholder.com/400x400?text=Wireless+Headphones+1",
            "https://via.placeholder.com/400x400?text=Wireless+Headphones+2",
            "https://via.placeholder.com/400x400?text=Wireless+Headphones+3"
        ],
        weight: "250g",
        dimensions: "20cm x 18cm x 8cm",
        barcode: "8719325461829",
        sku: "WH-PREM-001",
        warranty: "2 Years",
        color: "Black, Silver, Gold"
    },
    2: {
        id: 2,
        title: "High-Speed USB-C Cable",
        price: 19.99,
        stock: 50,
        description: "Premium USB-C cable with ultra-fast data transfer speeds up to 480Mbps and high-power charging capability of 100W. Durable braided nylon construction ensures longevity and reliability. Compatible with all USB-C devices including smartphones, tablets, and laptops.",
        images: [
            "https://via.placeholder.com/400x400?text=USB-C+Cable+1",
            "https://via.placeholder.com/400x400?text=USB-C+Cable+2",
            "https://via.placeholder.com/400x400?text=USB-C+Cable+3"
        ],
        weight: "50g",
        dimensions: "200cm (length)",
        barcode: "5901234123457",
        sku: "CABLE-USB-C-2M",
        warranty: "1 Year",
        color: "Black"
    },
    3: {
        id: 3,
        title: "Portable Bluetooth Speaker",
        price: 79.99,
        stock: 22,
        description: "Compact and powerful portable Bluetooth speaker with 360-degree sound. Features waterproof design (IPX7), 12-hour battery life, and deep bass technology. Perfect for outdoor adventures, beach trips, and gatherings. Lightweight and easy to carry.",
        images: [
            "https://via.placeholder.com/400x400?text=Bluetooth+Speaker+1",
            "https://via.placeholder.com/400x400?text=Bluetooth+Speaker+2",
            "https://via.placeholder.com/400x400?text=Bluetooth+Speaker+3"
        ],
        weight: "420g",
        dimensions: "15cm x 7cm x 7cm",
        barcode: "7891234567890",
        sku: "SPKR-BT-PORT-001",
        warranty: "1 Year",
        color: "Black, Blue, Red"
    },
    4: {
        id: 4,
        title: "20000mAh Power Bank",
        price: 49.99,
        stock: 35,
        description: "High-capacity 20000mAh power bank with dual USB and USB-C ports for simultaneous charging of multiple devices. Features fast-charging technology, LED display showing remaining battery percentage, and compact design. Ideal for travelers and professionals.",
        images: [
            "https://via.placeholder.com/400x400?text=Power+Bank+1",
            "https://via.placeholder.com/400x400?text=Power+Bank+2",
            "https://via.placeholder.com/400x400?text=Power+Bank+3"
        ],
        weight: "370g",
        dimensions: "16cm x 8cm x 2cm",
        barcode: "9876543210123",
        sku: "PB-20000-DUAL",
        warranty: "18 Months",
        color: "Black, White, Blue"
    },
    5: {
        id: 5,
        title: "Tempered Glass Screen Protector",
        price: 9.99,
        stock: 100,
        description: "Ultra-thin tempered glass screen protector offering maximum clarity and protection. 99.9% transparency maintains original display quality while protecting against scratches and minor impacts. Easy bubble-free installation with precise cutouts for all phone models.",
        images: [
            "https://via.placeholder.com/400x400?text=Screen+Protector+1",
            "https://via.placeholder.com/400x400?text=Screen+Protector+2",
            "https://via.placeholder.com/400x400?text=Screen+Protector+3"
        ],
        weight: "5g",
        dimensions: "15cm x 7cm",
        barcode: "4567890123456",
        sku: "SCRN-PROT-TEMPER",
        warranty: "Lifetime",
        color: "Clear"
    }
};

// Load Product Details
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId || !products[productId]) {
        window.location.href = 'index.html';
        return;
    }

    const product = products[productId];

    // Set main image
    const mainImage = document.getElementById('mainImage');
    mainImage.src = product.images[0];

    // Set thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (product.images[index]) {
            thumb.src = product.images[index];
            thumb.alt = `${product.title} - Image ${index + 1}`;
            
            if (index === 0) {
                thumb.classList.add('active');
            }

            thumb.addEventListener('click', () => {
                mainImage.src = product.images[index];
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        }
    });

    // Set product information
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = product.description;

    // Stock status
    const stockStatus = document.getElementById('stockStatus');
    if (product.stock > 0) {
        stockStatus.textContent = `✓ In Stock (${product.stock} items available)`;
        stockStatus.classList.add('in-stock');
    } else {
        stockStatus.textContent = '✗ Out of Stock';
        stockStatus.classList.add('out-of-stock');
    }

    // Product information table
    document.getElementById('weight').textContent = product.weight;
    document.getElementById('dimensions').textContent = product.dimensions;
    document.getElementById('barcode').textContent = product.barcode;
    document.getElementById('sku').textContent = product.sku;
    document.getElementById('warranty').textContent = product.warranty;
    document.getElementById('color').textContent = product.color;

    // Buy Now button
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (product.stock === 0) {
        buyNowBtn.disabled = true;
        buyNowBtn.textContent = 'Out of Stock';
        buyNowBtn.style.opacity = '0.5';
        buyNowBtn.style.cursor = 'not-allowed';
    } else {
        buyNowBtn.addEventListener('click', () => {
            alert(`Added "${product.title}" to cart!\n\nPrice: $${product.price.toFixed(2)}\n\nProceeding to checkout...`);
        });
    }
}

// Handle Contact Form Submission
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const product = document.getElementById('product').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Simulate form submission
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully. We will contact you at ${email} soon.`;
        formMessage.classList.remove('error');
        formMessage.classList.add('success');

        // Log form data (in real app, this would be sent to a server)
        console.log('Form Data:', {
            name,
            email,
            subject,
            message,
            product: product ? `Product ID: ${product}` : 'No product selected',
            timestamp: new Date().toLocaleString()
        });

        // Reset form
        form.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
        }, 5000);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.classList.remove('error', 'success');
    formMessage.classList.add(type);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load product details if on product page
    if (document.getElementById('productTitle')) {
        loadProductDetails();
    }

    // Handle contact form if on contact page
    if (document.getElementById('contactForm')) {
        handleContactForm();
    }
});
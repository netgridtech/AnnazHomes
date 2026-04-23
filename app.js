const menuData = {
    food: [
        {
            category: "SOUPS (Category A)",
            items: [
                { id: "soup-afang", name: "Afang Soup", img: "img/Afang_Soup.jpg", options: [{size: "1L", price: 15000}, {size: "2.4L", price: 35000}, {size: "3L", price: 40000}, {size: "5L", price: 60000}] },
                { id: "soup-edikanikong", name: "Edikanikong Soup", img: "img/Edikanikong_Soup.jpg", options: [{size: "1L", price: 15000}, {size: "2.4L", price: 35000}, {size: "3L", price: 40000}, {size: "5L", price: 60000}] },
                { id: "soup-egusi", name: "Egusi Soup", img: "img/Egusi_Soup.jpg", options: [{size: "1L", price: 15000}, {size: "2.4L", price: 35000}, {size: "3L", price: 40000}, {size: "5L", price: 60000}] },
                { id: "soup-ogbono", name: "Ogbono Soup", img: "img/Ogbono_Soup.jpg", options: [{size: "1L", price: 15000}, {size: "2.4L", price: 35000}, {size: "3L", price: 40000}, {size: "5L", price: 60000}] },
                { id: "soup-bitterleaf", name: "Bitterleaf Soup", img: "img/Bitterleaf_Soup.jpg", options: [{size: "1L", price: 15000}, {size: "2.4L", price: 35000}, {size: "3L", price: 40000}, {size: "5L", price: 60000}] },
                { id: "soup-groundnut", name: "Groundnut Soup", img: "img/Groundnut_Soup.jpg", options: [{size: "1L", price: 15000}, {size: "2.4L", price: 35000}, {size: "3L", price: 40000}, {size: "5L", price: 60000}] }
            ]
        },
        {
            category: "SOUPS (Category B – Premium Seafood)",
            items: [
                { id: "soup-seafood-okra", name: "Seafood Okra", img: "img/Seafood_Okra.jpg", options: [{size: "1L", price: 20000}, {size: "2.4L", price: 45000}, {size: "3L", price: 55000}, {size: "5L", price: 65000}] },
                { id: "soup-fisherman", name: "Fisherman Soup", img: "img/Fisherman_Soup.jpg", options: [{size: "1L", price: 20000}, {size: "2.4L", price: 45000}, {size: "3L", price: 55000}, {size: "5L", price: 65000}] },
                { id: "soup-banga", name: "Banga Soup", img: "img/Banga_Soup.jpg", options: [{size: "1L", price: 20000}, {size: "2.4L", price: 45000}, {size: "3L", price: 55000}, {size: "5L", price: 65000}] }
            ]
        },
        {
            category: "RICE",
            items: [
                { id: "rice-seafood", name: "Seafood Rice", img: "img/Seafood_Rice.jpg", options: [{ size: "500ML", price: 5000 }, {size: "1L", price: 15000}, {size: "2.4L", price: 35000}, {size: "3L", price: 45000}] }
            ]
        },
        {
            category: "PANCAKES",
            items: [
                { id: "pancake-special", name: "Annaz_Homes Special Fillings", img: "img/PANCAKES.jpg", options: [{size: "1 Wrap", price: 1500}] }
            ]
        },
        {
            category: "PEPPERSOUP",
            items: [
                { id: "peppersoup", name: "Spicy Peppersoup", img: "img/Spicy_Peppersoup.jpg", options: [{size: "1L", price: 15000}, {size: "2.4L", price: 30000}] }
            ]
        }
    ],
    drinks: [
        {
            category: "CHILLED BEVERAGES",
            items: [
                { id: "drink-water", name: "Premium Table Water", img: "img/Premium_Table_Water.jpg", options: [{size: "75cl", price: 500}] },
                { id: "drink-juice", name: "Fresh Fruit Juice", img: "img/Fresh_Fruit_Juice.jpg", options: [{size: "Per Glass", price: 2000}] }
            ]
        }
    ]
};

// State
let cart = JSON.parse(localStorage.getItem('annaz-cart')) || [];
const WHATSAPP_NUMBER = "2349061874534";

function formatCurrency(amount) {
    return `₦${amount.toLocaleString('en-NG')}`;
}

// Initialization
function initApp() {
    renderMenu();
    renderCart();
}

function switchTab(tabId) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

function renderMenu() {
    const foodsContainer = document.getElementById('foods');
    const drinksContainer = document.getElementById('drinks-container');

    // Render Foods
    menuData.food.forEach(categoryData => {
        let sectionHTML = `<h2 class="category-title">${categoryData.category}</h2><div class="menu-grid">`;
        
        categoryData.items.forEach(item => {
            sectionHTML += createItemCard(item);
        });

        sectionHTML += `</div>`;
        foodsContainer.innerHTML += sectionHTML;
    });

    // Render Drinks
    menuData.drinks.forEach(categoryData => {
        let sectionHTML = `<h2 class="category-title">${categoryData.category}</h2><div class="menu-grid">`;
        
        categoryData.items.forEach(item => {
            sectionHTML += createItemCard(item);
        });

        sectionHTML += `</div>`;
        drinksContainer.innerHTML += sectionHTML;
    });
}

function createItemCard(item) {
    let optionsHTML = item.options.map((opt, index) => 
        `<option value="${index}">${opt.size} — ${formatCurrency(opt.price)}</option>`
    ).join('');

    return `
        <div class="item-card">
            <img src="${item.img}" class="item-img" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <div class="item-meta">
                    <select id="select-${item.id}" class="option-select">
                        ${optionsHTML}
                    </select>
                </div>
                <button class="add-btn" onclick="addToCart('${item.id}')">
                    <i class="fa-solid fa-plus"></i> Add to Order
                </button>
            </div>
        </div>
    `;
}

function findItemById(id) {
    for (let c of menuData.food) {
        let found = c.items.find(i => i.id === id);
        if (found) return found;
    }
    for (let c of menuData.drinks) {
        let found = c.items.find(i => i.id === id);
        if (found) return found;
    }
    return null;
}

function addToCart(id) {
    const product = findItemById(id);
    if (!product) return;

    const selectEl = document.getElementById(`select-${id}`);
    const selectedIndex = selectEl.value;
    const selectedOption = product.options[selectedIndex];

    // Create unique cart ID based on product + size
    const cartItemId = `${id}-${selectedIndex}`;
    const existingItem = cart.find(i => i.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({
            cartItemId: cartItemId,
            name: product.name,
            size: selectedOption.size,
            price: selectedOption.price,
            qty: 1
        });
    }

    saveAndRenderCart();
}

function updateQty(cartItemId, change) {
    const itemIndex = cart.findIndex(i => i.cartItemId === cartItemId);
    if (itemIndex > -1) {
        cart[itemIndex].qty += change;
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveAndRenderCart();
    }
}

function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveAndRenderCart();
    }
}

function saveAndRenderCart() {
    localStorage.setItem('annazhomes-cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const itemsContainer = document.getElementById('cart-items');
    const summaryContainer = document.getElementById('cart-summary');
    const totalEl = document.getElementById('cart-total');

    const clearBtn = document.getElementById('clearCartBtn');

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div style="text-align:center; padding: 2rem 0; color: #888;">
                <i class="fa-solid fa-cart-arrow-down fa-3x" style="color: #ddd; margin-bottom: 1rem;"></i>
                <p>Your cart is empty.<br>Select items to start your order.</p>
            </div>
        `;
        summaryContainer.style.display = 'none';
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }

    summaryContainer.style.display = 'block';
    if (clearBtn) clearBtn.style.display = 'inline-block';
    
    let itemsHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;

        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <strong>${item.name}</strong>
                    <small>Size: ${item.size}</small>
                    <span class="price">${formatCurrency(item.price)}</span>
                </div>
                <div class="qty-controls">
                    <button type="button" class="qty-btn" onclick="updateQty('${item.cartItemId}', -1)">-</button>
                    <span class="qty-display">x ${item.qty}</span>
                    <button type="button" class="qty-btn" onclick="updateQty('${item.cartItemId}', 1)">+</button>
                </div>
            </div>
        `;
    });

    itemsContainer.innerHTML = itemsHTML;
    totalEl.innerText = formatCurrency(grandTotal);
}

function toggleAddress(val) {
    document.getElementById('addressGroup').style.display = (val === 'Pickup') ? 'none' : 'block';
}

document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const delivery = document.getElementById('deliveryOption').value;
    const address = document.getElementById('custAddress').value;
    const payment = document.getElementById('paymentType').value;

    let itemsText = "";
    let grandTotal = 0;

    cart.forEach(i => {
        itemsText += `- ${i.name} (${i.size}) x${i.qty} = ${formatCurrency(i.price * i.qty)}\n`;
        grandTotal += (i.price * i.qty);
    });

    const message = `*NEW ORDER: ANNAZ HOMES*%0A%0A` +
        `*Customer:* ${name}%0A` +
        `*Phone:* ${phone}%0A%0A` +
        `*ORDER DETAILS:*%0A${encodeURIComponent(itemsText)}%0A` +
        `*Grand Total:* ${formatCurrency(grandTotal)}%0A%0A` +
        `*Delivery:* ${delivery}%0A` +
        `*Address:* ${address || 'N/A'}%0A` +
        `*Payment Method:* ${payment}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    
    // Optional: Clear cart after ordering
    // cart = [];
    // saveAndRenderCart();
};

// Bootstrap app
initApp();

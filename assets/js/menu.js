generateMenu()
function generateMenu() {
    const menuContainerPad = document.getElementById('menu-container-pad');
    const menuContainerTom = document.getElementById('menu-container-tom');
    const menuContainerYam = document.getElementById('menu-container-yam');

    menuContainerPad.innerHTML = "";
    menuContainerTom.innerHTML = "";
    menuContainerYam.innerHTML = "";

    let modalHTML = '';

    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];

        const menuHTML = `
                <div class="d-flex ms-5">
                    <div class="PictureWrapper"><img src="${item.imageUrl}" loading="lazy" width="145"></div>
                    <div class="foodDetail ms-5" style="align-content: end; color: black;">
                        <div class="foodTitle"><h3>${item.name}</h3></div>
                        <div class="foodDesc">${item.description}</div>
                        <div class="foodCost"><span class="foodCost">฿${item.price}</span></div>
                        <div class="foodBtn">
                            <button type="button" class="food-btn" id="cartBtn-${item.id}" onclick="showOrderModal(${item.id})" data-bs-toggle="modal"
                            data-bs-target="#modal-${item.id}">
                            <i class="fa-solid fa-cart-shopping"></i> <span class="Menu-span">Order!</span>
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
            `;
        if (item.catagories === "Pad") {
            menuContainerPad.innerHTML += menuHTML;
        } else if (item.catagories === "Tom") {
            menuContainerTom.innerHTML += menuHTML;
        } else if (item.catagories === "Yam") {
            menuContainerYam.innerHTML += menuHTML;
        }
        modalHTML += `
                <div id="modal-${item.id}" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel-${item.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" style="background-color: #274b44;">
                            <div class="modal-header">
                                <h5 class="modal-title" id="myModalLabel-${item.id}">
                                    <p class="mb-0" style="color: white;">${item.name}</p>
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="order-food">
                                <div class="d-flex">
                                    <div class="PictureWrapper">
                                        <img src="${item.imageUrl}" loading="lazy" width="150">
                                    </div>
                                    <div class="foodDetail ms-5" style="color: white; align-content: end;";">
                                        <div class="foodTitle"><h3>${item.name}</h3></div>
                                        <div class="foodDesc">${item.description}</div>
                                        <div class="foodCost">
                                            <p id="base-cost-${item.id}" value="${item.price}">฿${item.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <p style="color: white;">ข้อมความเพิ่มเติม (ถ้ามี)</p>
                                <div class="input-group">
                                    <textarea class="form-control" aria-label="With textarea" placeholder="ระบุข้อความ"></textarea>
                                </div>
                                <div class="row justify-content-center footer-food">
                                    <div class="quantity-container col-auto d-flex align-items-center">
                                        <button class="quantity-button" id="decreaseBtn-${item.id}" onclick="addQ(${item.id}, -1)">-</button>
                                        <input type="number" id="quantity-${item.id}" class="quantity-display" value="1" min="1"
                                            onchange="calBtnCost(${item.id})">
                                        <button class="quantity-button" id="increaseBtn-${item.id}" onclick="addQ(${item.id}, 1)">+</button>
                                    </div>
                                    <div class="col align-content-center">
                                        <button class="btn btn-success" style="width: 100%;" id="btn-cost-${item.id}"
                                            onclick="addToCart(${item.id})">
                                            เพิ่มลงตะกร้า ฿${item.price}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
    document.getElementById('modal-all').innerHTML += modalHTML;
}

function showOrderModal(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const baseCostElement = document.querySelector(`#base-cost-${itemId}`);
    const priceButton = document.querySelector(`#btn-cost-${itemId}`);
    const quantityInput = document.querySelector(`#quantity-${itemId}`);

    baseCostElement.textContent = `฿${item.price}`;
    quantityInput.value = 1;
    priceButton.innerText = `เพิ่มลงตะกร้า ฿${item.price}`;
    calBtnCost(itemId);
}

function calBtnCost(itemId) {
    const quantity = parseInt(document.getElementById(`quantity-${itemId}`).value);
    const baseCostElement = document.querySelector(`#base-cost-${itemId}`);
    const price = parseInt(baseCostElement.textContent.replace('฿', ''));
    const totalCost = price * quantity;

    document.getElementById(`btn-cost-${itemId}`).innerText = `เพิ่มลงตะกร้า ฿${totalCost}`;
}

function addQ(itemId, amount) {
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantityInput.value);
    quantity = Math.max(1, quantity + amount);
    quantityInput.value = quantity;
    calBtnCost(itemId);
}

function updateCartDisplay() {
    const itemCartAll = document.getElementById('itemCartAll');
    const cartCost = document.getElementById('cartCost');
    const cartAmount = document.getElementById('cartAmount');
    const cartCostFooter = document.getElementById('cartCostFooter');
    const cartAmountFooter = document.getElementById('cartAmountFooter');

    itemCartAll.innerHTML = ""; // Clear previous cart items

    if (cart.length === 0) {
        itemCartAll.innerHTML = "<p>Your cart is empty.</p>";
        cartCost.innerText = "฿0.00";
        cartAmount.innerText = "0";
        cartCostFooter.innerText = "฿0.00";
        cartAmountFooter.innerText = "0";
        return;
    }

    let totalCost = 0;
    let totalItems = 0;

    // Loop through cart items and populate the cart display
    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        const itemCost = cartItem.price * cartItem.quantity;
        totalCost += itemCost;
        totalItems += cartItem.quantity;

        const cartHTML = `
            <div class="card cart mt-1">
                <div class="card-body">
                    <div class="row cart">
                        <div class="col-auto">
                            <img src="${cartItem.imageUrl}" width="70px" alt="">
                            <span style="color: #274b44;" id="cartTitle">${cartItem.name}</span>
                            <span>฿${itemCost.toFixed(2)}</span>
                        </div>
                        <div class="col-auto d-flex align-items-center"
                            style="height: auto; position: absolute; right: 0; bottom: 25%;">
                            <button class="quantity-button" onclick="addQCart(${cartItem.id}, -1)" style="color: black;">-</button>
                            <input type="number" id="quantityCart-${cartItem.id}" class="quantity-display"
                                value="${cartItem.quantity}" min="1" onchange="updateCartQuantity(${cartItem.id}, this.value)" style="height: fit-content;">
                            <button class="quantity-button" onclick="addQCart(${cartItem.id}, 1)" style="color: black;">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        itemCartAll.innerHTML += cartHTML;
    }

    // Update footer and top cart summary
    const totalCostFormatted = `฿${totalCost.toFixed(2)}`;
    cartCost.innerText = totalCostFormatted;
    cartAmount.innerText = totalItems;
    cartCostFooter.innerText = totalCostFormatted;
    cartAmountFooter.innerText = totalItems;
}



function addQCart(itemId, amount) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;

    cartItem.quantity = Math.max(1, cartItem.quantity + amount);
    updateCartDisplay();
}

function updateCartQuantity(itemId, newQuantity) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;

    cartItem.quantity = Math.max(1, parseInt(newQuantity));
    updateCartDisplay();
}


function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    const quantity = parseInt(quantityInput.value);

    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: quantity,
            imageUrl: item.imageUrl,
        });
    }

    updateCartDisplay();
    const notyf = new Notyf();
    notyf.success(`Added ${quantity} x ${item.name} to the cart!`);

}
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);

// const name = urlParams.get('name');
// const age = urlParams.get('age');

// document.getElementById('1').innerHTML = `Name: ${name}, Age: ${age}`;




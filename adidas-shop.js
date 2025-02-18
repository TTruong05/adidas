const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Lấy tất cả nút "Thêm giỏ hàng"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Lấy thông tin sản phẩm từ thuộc tính data-product
        const productElement = button.closest('.col-md-4');
        const productData = JSON.parse(productElement.getAttribute('data-product'));

        // Thêm sản phẩm vào giỏ hàng
        cart.push(productData);
        localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage

        // Hiển thị thông báo xác nhận
        alert(`${productData.name} đã được thêm vào giỏ hàng!`);
        
        // Cập nhật số lượng sản phẩm trong giỏ hàng nếu cần
        updateCartCount();
    });
});

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng (nếu cần)
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count'); // Lấy phần tử hiển thị số lượng giỏ hàng
    if (cartCountElement) {
        cartCountElement.textContent = cart.length; // Cập nhật số lượng sản phẩm
    }
}

// Hàm để cập nhật giỏ hàng trong cart.html
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Xóa danh sách sản phẩm trong giỏ hàng
    cartItemsElement.innerHTML = '';
    let totalPrice = 0;

    // Thêm sản phẩm vào giỏ hàng
    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `<img src="${product.image}" alt="${product.name}" width="50" /> ${product.name} - ${product.price.toLocaleString()}₫`;

        // Thêm nút xóa
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.textContent = 'Xóa';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        li.appendChild(removeButton);
        cartItemsElement.appendChild(li);
        totalPrice += product.price; // Tính tổng giá
    });

    // Cập nhật tổng giá
    totalPriceElement.textContent = `Tổng giá: ${totalPrice.toLocaleString()}₫`;
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1); // Xóa sản phẩm tại vị trí index
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật lại localStorage
    updateCart(); // Cập nhật giỏ hàng
}

// Cập nhật giỏ hàng khi mở trang cart.html
if (document.getElementById('cart-items')) {
    updateCart();
}

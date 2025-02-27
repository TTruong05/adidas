const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Lấy tất cả nút "Thêm giỏ hàng"
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

    // Lấy thông tin sản phẩm từ thuộc tính data-product
    const productElement = button.closest(".col-md-4");
    const productData = JSON.parse(productElement.getAttribute("data-product"));

    // Thêm sản phẩm vào giỏ hàng
    cart.push(productData);
    localStorage.setItem("cart", JSON.stringify(cart)); // Lưu giỏ hàng vào localStorage

    // Hiển thị thông báo xác nhận
    alert(`${productData.name} đã được thêm vào giỏ hàng!`);

    // Cập nhật số lượng sản phẩm trong giỏ hàng nếu cần
    updateCartCount();
  });
});

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng (nếu cần)
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count"); // Lấy phần tử hiển thị số lượng giỏ hàng
  if (cartCountElement) {
    cartCountElement.textContent = cart.length; // Cập nhật số lượng sản phẩm
  }
}

// Hàm để cập nhật giỏ hàng trong cart.html
function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  // Xóa danh sách sản phẩm trong giỏ hàng
  cartItemsElement.innerHTML = "";
  let totalPrice = 0;

  // Thêm sản phẩm vào giỏ hàng
  cart.forEach((product, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `<img src="${product.image}" alt="${
      product.name
    }" width="50" /> ${product.name} - ${product.price.toLocaleString()}₫`;

    // Thêm nút xóa
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger btn-sm";
    removeButton.textContent = "Xóa";
    removeButton.addEventListener("click", () => {
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
  localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật lại localStorage
  updateCart(); // Cập nhật giỏ hàng
}

// Cập nhật giỏ hàng khi mở trang cart.html
if (document.getElementById("cart-items")) {
  updateCart();
}
document.getElementById("loginBtn").addEventListener("click", function () {
  document.getElementById("loginForm").requestSubmit();
});

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn form tải lại trang

    // Lấy giá trị từ input
    let username = document.getElementById("login").value.trim();
    let password = document.getElementById("password").value.trim();
    let phone = document.getElementById("phone").value.trim();

    // Kiểm tra định dạng số điện thoại (10 số, bắt đầu bằng 0)
    let phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert(
        "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại 10 số, bắt đầu bằng 0."
      );
      return;
    }

    // Giả lập tài khoản mẫu
    const validAccounts = [
      { username: "admin", password: "123456", phone: "0987654321" },
      { username: "vantruong", password: "truong123", phone: "0799338349" },
    ];

    // Kiểm tra đăng nhập
    let isValid = validAccounts.some(
      (account) =>
        account.username === username &&
        account.password === password &&
        account.phone === phone
    );

    if (isValid) {
      alert("Đăng nhập thành công!");
      let modal = bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      );
      modal.hide();
    } else {
      alert("Tên đăng nhập, mật khẩu hoặc số điện thoại không đúng!");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.innerHTML = '<i class="bi bi-eye-slash"></i>'; // Đổi icon
    } else {
      passwordInput.type = "password";
      togglePassword.innerHTML = '<i class="bi bi-eye"></i>'; // Đổi lại icon
    }
  });
});

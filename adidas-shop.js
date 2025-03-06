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

// Lấy phần tử hiển thị số lượng giỏ hàng
const cartCountElement = document.getElementById("cart-count");

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// Cập nhật số lượng khi tải trang
updateCartCount();
document.getElementById("loginBtn").addEventListener("click", function () {
  document.getElementById("loginForm").requestSubmit();
});
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const switchToRegister = document.getElementById("switchToRegister");
  const switchToLogin = document.getElementById("switchToLogin");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // Hiển thị form đăng ký, ẩn form đăng nhập
  switchToRegister.addEventListener("click", function () {
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
    switchToRegister.classList.add("d-none");
    switchToLogin.classList.remove("d-none");
    loginBtn.classList.add("d-none");
    registerBtn.classList.remove("d-none");
  });

  // Hiển thị form đăng nhập, ẩn form đăng ký
  switchToLogin.addEventListener("click", function () {
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    switchToRegister.classList.remove("d-none");
    switchToLogin.classList.add("d-none");
    loginBtn.classList.remove("d-none");
    registerBtn.classList.add("d-none");
  });

  // Xử lý hiển thị mật khẩu
  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
      passwordInput.type = "password";
      togglePassword.innerHTML = '<i class="bi bi-eye"></i>';
    }
  });

  // Xử lý sự kiện đăng nhập
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login").value;
    const password = passwordInput.value;
    alert(`Đăng nhập thành công!\nTên đăng nhập: ${username}`);
  });

  // Xử lý sự kiện đăng ký khi nhấn nút "Đăng ký"
  registerBtn.addEventListener("click", function () {
    if (registerForm.classList.contains("d-none")) return; // Ngăn lỗi nếu form đang ẩn
    registerForm.dispatchEvent(new Event("submit", { bubbles: true }));
  });

  // Xử lý sự kiện đăng ký
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fullName = document.getElementById("registerName").value;
    const phone = document.getElementById("registerPhone").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    alert(`Đăng ký thành công!\nTên: ${fullName}\nSố điện thoại: ${phone}`);
  });
});

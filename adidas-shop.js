// Lấy danh sách sản phẩm từ localStorage hoặc dùng danh sách mặc định
let products = JSON.parse(localStorage.getItem("products")) || [];

// Lưu danh sách sản phẩm vào localStorage
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Thêm sản phẩm từ admin vào danh sách
function addProduct(name, price, brand, rating, imageFront, imageBack) {
  const newProduct = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
    brand,
    rating: parseFloat(rating),
    imageFront,
    imageBack,
  };

  products.push(newProduct);
  saveProducts();
  displayProducts();
}

// Chuyển số rating thành icon sao
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return "★".repeat(fullStars) + "☆".repeat(halfStar) + "☆".repeat(emptyStars);
}

// Hiển thị danh sách sản phẩm
function displayProducts() {
  const productContainer = document.getElementById("product-list");
  if (!productContainer) return;

  productContainer.className = "row gx-2";
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "col-md-4";

    productElement.innerHTML = `
      <div class="card-sp  p-0">
        <div class="img-container">
          <img src="${product.imageFront}" class="img-sp-truoc w-100" alt="${
      product.name
    }">
          <img src="${
            product.imageBack
          }" class="img-sp-sau w-100 position-absolute" alt="${product.name}">
        </div>
        <div class="p-0 pt-2 pb-4 ps-1">
          <h5 class="sp-ten">${product.name}</h5>
          <p class="sp-gia mb-1 text-danger fs-6 fw-bold">${product.price.toLocaleString()}₫</p>
          <p class="text-secondary mb-1 fs-5">${generateStarRating(
            product.rating
          )}</p>
          <p class="text-muted fs-6">${product.brand}</p>
          <button class="text-secondary btn btn-outline-dark w-100 add-to-cart" data-id="${
            product.id
          }">
            <i class="bi bi-bag"></i> Thêm giỏ hàng
          </button>
        </div>
      </div>
    `;

    productContainer.appendChild(productElement);
  });

  attachEventListeners();
}

// Gắn sự kiện "Thêm vào giỏ hàng"
function attachEventListeners() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} đã được thêm vào giỏ hàng!`);
  updateCartCount();
}

// Cập nhật số lượng trong giỏ hàng
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// Cập nhật giỏ hàng trong cart.html
function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  if (!cartItemsElement || !totalPriceElement) return;

  cartItemsElement.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsElement.innerHTML =
      "<p class='text-center text-secondary'>Giỏ hàng trống</p>";
    totalPriceElement.textContent = "Tổng giá: 0₫";
    return;
  }

  cart.forEach((product, index) => {
    const li = document.createElement("li");
    li.className = "cart-item list-group-item";

    li.innerHTML = `
      <img src="${product.imageFront}" alt="${product.name}" class="img-fluid">
      <div class="cart-item-info">
        <strong>${product.name}</strong>
        <span>${product.price.toLocaleString()}₫</span>
        <span class="fw-bold">(x${product.quantity})</span>
      </div>
      <div class="cart-item-controls">
        <button class="btn btn-sm btn-danger" onclick="updateQuantity(${index}, -1)">-</button>
        <button class="btn btn-sm btn-danger" onclick="updateQuantity(${index}, 1)">+</button>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">xóa</button>
      </div>
    `;

    cartItemsElement.appendChild(li);
    totalPrice += product.price * product.quantity;
  });

  totalPriceElement.textContent = `Tổng giá: ${totalPrice.toLocaleString()}₫`;
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity + change > 0) {
    cart[index].quantity += change;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Chạy khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCartCount();
  updateCart();
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

  // Tài khoản admin cố định
  let userAccounts = JSON.parse(localStorage.getItem("userAccounts")) || [];
  document.addEventListener("DOMContentLoaded", function () {
    const adminAccount = {
      username: "admin",
      password: "admin123",
      phone: "0123456789",
    };

    // Kiểm tra nếu localStorage chưa có tài khoản thì khởi tạo
    if (!localStorage.getItem("userAccounts")) {
      localStorage.setItem("userAccounts", JSON.stringify([adminAccount]));
    }

    // Lấy danh sách tài khoản từ localStorage
  });

  // Chuyển đổi giữa đăng nhập & đăng ký
  switchToRegister.addEventListener("click", function () {
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
    switchToRegister.classList.add("d-none");
    switchToLogin.classList.remove("d-none");
    loginBtn.classList.add("d-none");
    registerBtn.classList.remove("d-none");
  });

  switchToLogin.addEventListener("click", function () {
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    switchToRegister.classList.remove("d-none");
    switchToLogin.classList.add("d-none");
    loginBtn.classList.remove("d-none");
    registerBtn.classList.add("d-none");
  });

  // Hiển thị / Ẩn mật khẩu
  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
      passwordInput.type = "password";
      togglePassword.innerHTML = '<i class="bi bi-eye"></i>';
    }
  });

  // Xử lý đăng nhập
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("login").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = passwordInput.value.trim();

    // Kiểm tra tài khoản admin
    if (
      (username === adminAccount.username || phone === adminAccount.phone) &&
      password === adminAccount.password
    ) {
      alert("Đăng nhập thành công với tư cách Admin!");
      localStorage.setItem("userRole", "admin");

      // Đợi 0.5 giây để chắc chắn localStorage đã lưu trước khi chuyển trang
      setTimeout(() => {
        window.location.href = "admin.html";
      }, 500); // Mở trang admin trong tab mới
      return;
    }

    // Kiểm tra tài khoản khách
    const user = userAccounts.find(
      (u) =>
        (u.username === username || u.phone === phone) &&
        u.password === password
    );

    if (user) {
      alert("Đăng nhập thành công!");
      localStorage.setItem("userRole", "user");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 500); // Chuyển đến trang chính
    } else {
      alert("Tên đăng nhập, số điện thoại hoặc mật khẩu không đúng!");
    }
  });

  // Xử lý đăng ký tài khoản khách
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fullName = document.getElementById("registerName").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (!fullName || !phone || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Kiểm tra số điện thoại đã tồn tại chưa
    if (userAccounts.some((user) => user.phone === phone)) {
      alert("Số điện thoại này đã được đăng ký!");
      return;
    }

    // Lưu tài khoản mới
    userAccounts.push({ username: fullName, phone, password });
    localStorage.setItem("userAccounts", JSON.stringify(userAccounts));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    switchToLogin.click(); // Quay lại form đăng nhập
  });
});

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

    // Kiểm tra nếu localStorage chưa có tài khoản admin thì khởi tạo
    if (!localStorage.getItem("userAccounts")) {
      localStorage.setItem("userAccounts", JSON.stringify([adminAccount]));
    }
  });

  // Giả sử ban đầu đang ở trạng thái đăng nhập
  let isLoginMode = true;
  const switchModeBtn = document.getElementById("switchModeBtn");
  const submitBtn = document.getElementById("submitBtn");

  switchModeBtn.addEventListener("click", function () {
    if (isLoginMode) {
      // Chuyển sang trạng thái đăng ký
      document.getElementById("loginForm").classList.add("d-none");
      document.getElementById("registerForm").classList.remove("d-none");
      // Cập nhật thuộc tính form của submitBtn để submit registerForm
      submitBtn.setAttribute("form", "registerForm");
      submitBtn.textContent = "Đăng ký";
      switchModeBtn.textContent = "Quay lại đăng nhập";
      isLoginMode = false;
    } else {
      // Quay lại trạng thái đăng nhập
      document.getElementById("registerForm").classList.add("d-none");
      document.getElementById("loginForm").classList.remove("d-none");
      submitBtn.setAttribute("form", "loginForm");
      submitBtn.textContent = "Đăng nhập";
      switchModeBtn.textContent = "Đăng ký";
      isLoginMode = true;
    }
  });

  // Thêm xử lý cho form đăng ký
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Lấy dữ liệu từ các trường của form đăng ký
    const registerName = document.getElementById("registerName").value;
    const registerPhone = document.getElementById("registerPhone").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (registerPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Lấy danh sách tài khoản đã lưu trong localStorage, nếu chưa có thì khởi tạo mảng rỗng
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Tạo đối tượng tài khoản mới
    const newAccount = {
      id: Date.now(),
      username: registerName,
      accountPassword: registerPassword,
      phone: registerPhone,
    };

    // Thêm tài khoản mới vào mảng
    accounts.push(newAccount);
    // Lưu lại vào localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));
    alert("Đăng ký thành công!");

    // Sau khi đăng ký, bạn có thể chuyển về form đăng nhập hoặc chuyển hướng đến admin.html
    // Ví dụ: chuyển về form đăng nhập
    document.getElementById("registerForm").classList.add("d-none");
    document.getElementById("loginForm").classList.remove("d-none");
    submitBtn.setAttribute("form", "loginForm");
    submitBtn.textContent = "Đăng nhập";
    switchModeBtn.textContent = "Đăng ký";
    isLoginMode = true;
  });

  // Bạn có thể thêm xử lý cho form đăng nhập nếu cần ở đây...

  // Xử lý hiển thị/ẩn mật khẩu
  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
      passwordInput.type = "password";
      togglePassword.innerHTML = '<i class="bi bi-eye"></i>';
    }
  });
});

// Lắng nghe sự kiện nhập vào ô tìm kiếm
document.getElementById("search-input").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();
  filterProducts(searchText);
});

// Cập nhật displayProducts để nhận danh sách sản phẩm tùy chỉnh
function displayProducts(filteredList = products) {
  const productContainer = document.getElementById("product-list");
  if (!productContainer) return;

  productContainer.innerHTML = "";
  productContainer.className = "row gx-2";

  filteredList.forEach((product) => {
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
document.getElementById("search-input").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();
  filterProducts(searchText);
});

document.getElementById("clear-search").addEventListener("click", function () {
  document.getElementById("search-input").value = "";
  document.getElementById("search-results").innerHTML = "";
  document.getElementById("search-results").style.display = "none";
});

function filterProducts(searchText) {
  const searchResultsContainer = document.getElementById("search-results");

  if (searchText.trim() === "") {
    searchResultsContainer.innerHTML = "";
    searchResultsContainer.style.display = "none";
    return;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText)
  );

  displaySearchResults(filteredProducts);
}

function displaySearchResults(filteredList) {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = ""; // Xóa kết quả cũ

  if (filteredList.length === 0) {
    searchResultsContainer.style.display = "none";
    return;
  }

  searchResultsContainer.style.display = "block";

  filteredList.forEach((product) => {
    const imageUrl = product.image ? product.image : "default-image.jpg";
    const category = product.category ? product.category : "";

    const searchItem = document.createElement("div");
    searchItem.className = "search-item";
    searchItem.addEventListener("click", function () {
      window.location.href = "adidas-shop.html";
    });
    searchItem.innerHTML = `
      <div class="search-item-content">
        <img src="${imageUrl}" alt="${
      product.name
    }" class="product-image" onerror="this.src='${product.imageFront}'">
        <div class="product-info">
          <span class="product-category">${category}</span>
          <span class="product-name">${product.name}</span>
          <span class="product-price">${product.price.toLocaleString()}₫</span>
        </div>
      </div>
    `;

    searchResultsContainer.appendChild(searchItem);
  });
}

// Ẩn kết quả khi click ra ngoài
document.addEventListener("click", function (event) {
  const searchResultsContainer = document.getElementById("search-results");
  const searchInput = document.getElementById("search-input");

  if (
    !searchResultsContainer.contains(event.target) &&
    event.target !== searchInput
  ) {
    searchResultsContainer.style.display = "none";
  }
});

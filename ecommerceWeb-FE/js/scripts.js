const products = [
  {
    id: 1,
    name: "Fresh-Apple",
    category: "Fresh-Fruits",
    price: 1.5,
    description: "Fresh, without artificial colors",
    imageUrl: "/images/apple.webp",
    featured: true,
  },
  {
    id: 2,
    name: "Tomato",
    category: "Organic-vegies",
    price: 1.2,
    description: "NOn hybrid",
    imageUrl: "/images/tomato.jpg",
    featured: true,
  },
  {
    id: 3,
    name: "basmati Rice",
    category: "Groceries",
    price: 2.5,
    description: "Premium quality basmati rice",
    imageUrl: "/images/basmati.jpeg",
    featured: false,
  },
];

const customer = {
  name: "John Samuel",
  email: "john.doe@example.com",
  address: "123 Main St, Springfield, India",
  orderHistory: [],
};

const categories = [
  { name: "Fit-wear", imageUrl: "/images/fitwear.jpg" },
  { name: "Occasion-wear", imageUrl: "/images/occasionwear.jpg" },
  { name: "Material-wear", imageUrl: "/images/materialwear.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function saveCategories() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

function saveCustomer() {
  localStorage.setItem("customer", JSON.stringify(customer));
}

function displayProducts(filteredProducts = products) {
  const container = document.getElementById("productContainer");
  if (!container) return;
  container.innerHTML = "";
  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${
        product.category.charAt(0).toUpperCase() + product.category.slice(1)
      }</p>
      <p>$${product.price.toFixed(2)}</p>
      <a href="/product-detail.html?id=${product.id}">View Details</a>
    `;
    container.appendChild(card);
  });
}

function displayFeaturedProducts() {
  const container = document.getElementById("featuredProductContainer");
  if (!container) return;
  container.innerHTML = "";
  const featuredProducts = products.filter((product) => product.featured);
  featuredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${
        product.category.charAt(0).toUpperCase() + product.category.slice(1)
      }</p>
      <p>$${product.price.toFixed(2)}</p>
      <a href="/product-detail.html?id=${product.id}">View Details</a>
    `;
    container.appendChild(card);
  });
}

function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );
  displayProducts(filtered);
}

function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  let filtered = products;
  if (category) {
    filtered = filtered.filter((product) => product.category === category);
  }
  if (searchTerm) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }
  displayProducts(filtered);
}

function displayProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = products.find((p) => p.id === productId);
  if (product) {
    document.getElementById("productImage").src = product.imageUrl;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productCategory").textContent = `Category: ${
      product.category.charAt(0).toUpperCase() + product.category.slice(1)
    }`;
    document.getElementById(
      "productPrice"
    ).textContent = `Price: $${product.price.toFixed(2)}`;
    document.getElementById("productDescription").textContent =
      product.description;
  }
}

function updateCartCount() {
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    console.log(`Cart count updated to: ${totalItems}`);
  } else {
    console.log("Cart count element not found on this page.");
  }
}

function addToCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    console.log(`Added ${product.name} to cart. Current cart:`, cart);
    alert(`${product.name} added to cart!`);
  } else {
    console.log("Product not found for ID:", productId);
  }
}

function displayCart() {
  const container = document.getElementById("cartItems");
  if (!container) {
    console.log("Cart items container not found.");
    return;
  }
  container.className = "cart-items";
  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    console.log("Cart is empty.");
    return;
  }
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
    `;
    container.appendChild(itemDiv);
  });
  console.log("Cart displayed:", cart);
  updateCartCount();
}

function displayOrderSummary() {
  const container = document.getElementById("orderSummary");
  if (!container) return;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("orderTotal").textContent = `$${total.toFixed(2)}`;
  localStorage.setItem("orderTotal", total.toFixed(2));
}

function placeOrder() {
  if (!localStorage.getItem("isLoggedIn")) {
    alert("Please log in to place an order.");
    window.location.href = "/payment.html";
    return;
  }
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    window.location.href = "/payment.html";
  }
}

function processPayment(method) {
  if (!localStorage.getItem("isLoggedIn")) {
    alert("Please log in to complete the payment.");
    window.location.href = "/confirmation.html";
    return;
  }
  let isValid = true;
  if (method === "upi") {
    const upiId = document.getElementById("upiId").value;
    if (!upiId.includes("@")) {
      alert("Please enter a valid UPI ID.");
      isValid = false;
    }
  } else if (method === "card") {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;
    if (
      !/^\d{16}$/.test(cardNumber) ||
      !/^\d{2}\/\d{2}$/.test(expiry) ||
      !/^\d{3}$/.test(cvv)
    ) {
      alert("Please enter valid card details.");
      isValid = false;
    }
  } else if (method === "netbanking") {
    const bank = document.getElementById("bankSelect").value;
    if (!bank) {
      alert("Please select a bank.");
      isValid = false;
    }
  } else if (method === "cod") {
    if (
      !confirm(
        "Confirm Cash on Delivery? You will pay upon receiving the order."
      )
    ) {
      isValid = false;
    }
  }
  if (isValid) {
    const orderId = Date.now();
    const orderTotal = localStorage.getItem("orderTotal") || "0.00";
    customer.orderHistory.push({
      id: orderId,
      items: [...cart],
      total: parseFloat(orderTotal),
      paymentMethod: method.toUpperCase(),
      date: new Date().toLocaleString(),
    });
    saveCustomer();
    localStorage.setItem("paymentMethod", method.toUpperCase());
    localStorage.setItem("orderId", orderId);
    cart = [];
    saveCart();
    alert(`Payment via ${method.toUpperCase()} successful!`);
    window.location.href = "/confirmation.html";
  }
}

function displayConfirmation() {
  const orderIdEl = document.getElementById("orderId");
  const paymentMethodEl = document.getElementById("paymentMethod");
  const orderTotalEl = document.getElementById("orderTotal");
  if (orderIdEl && paymentMethodEl && orderTotalEl) {
    orderIdEl.textContent = localStorage.getItem("orderId") || "N/A";
    paymentMethodEl.textContent =
      localStorage.getItem("paymentMethod") || "N/A";
    orderTotalEl.textContent = `$${
      localStorage.getItem("orderTotal") || "0.00"
    }`;
  }
}

function displayAccount() {
  const nameEl = document.getElementById("customerName");
  const emailEl = document.getElementById("customerEmail");
  const addressEl = document.getElementById("customerAddress");
  const orderHistoryEl = document.getElementById("orderHistory");
  if (nameEl && emailEl && addressEl && orderHistoryEl) {
    nameEl.textContent = customer.name;
    emailEl.textContent = customer.email;
    addressEl.textContent = customer.address;
    if (customer.orderHistory.length === 0) {
      orderHistoryEl.innerHTML = "<p>No orders yet.</p>";
    } else {
      orderHistoryEl.innerHTML = "";
      customer.orderHistory.forEach((order) => {
        const orderDiv = document.createElement("div");
        orderDiv.className = "order-item";
        orderDiv.innerHTML = `
          <p>Order ID: ${order.id}</p>
          <p>Date: ${order.date}</p>
          <p>Payment Method: ${order.paymentMethod}</p>
          <p>Total: $${order.total.toFixed(2)}</p>
          <p>Items: ${order.items
            .map((item) => `${item.name} x${item.quantity}`)
            .join(", ")}</p>
        `;
        orderHistoryEl.appendChild(orderDiv);
      });
    }
  }
}

function checkAdminAccess() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin && window.location.pathname.includes("admin.html")) {
    alert("Access denied. Admins only.");
    window.location.href = "/login.html";
  }
}

function handleLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const isAdmin = document.getElementById("isAdmin").checked;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", isAdmin);
    alert("Login successful!");
    window.location.href = isAdmin ? "/admin.html" : "/index.html";
  });
}

function handleSignup() {
  const form = document.getElementById("signupForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const isAdmin = document.getElementById("isAdmin").checked;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", isAdmin);
    customer.email = email;
    saveCustomer();
    alert("Sign up successful!");
    window.location.href = isAdmin ? "/admin.html" : "/index.html";
  });
}

function displayAdminProducts() {
  const container = document.getElementById("productList");
  if (!container) return;
  container.innerHTML = "";
  products.forEach((product) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "product-card";
    itemDiv.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <p>${product.name} - $${product.price.toFixed(2)}</p>
      <button onclick="editProduct(${product.id})">Edit</button>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;
    container.appendChild(itemDiv);
  });
}

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    document.getElementById("productId").value = product.id;
    document.getElementById("productNameInput").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productImage").value = product.imageUrl;
    document.getElementById("productFeatured").checked = product.featured;
  }
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      saveProducts();
      displayAdminProducts();
      displayProducts();
      displayFeaturedProducts();
      alert("Product deleted successfully!");
    }
  }
}

function displayAdminCategories() {
  const container = document.getElementById("categoryList");
  if (!container) return;
  container.innerHTML = "";
  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <img src="${category.imageUrl}" alt="${category.name}">
      <h3>${category.name}</h3>
      <button onclick="editCategory('${category.name}')">Edit</button>
    `;
    container.appendChild(card);
  });
}

function editCategory(name) {
  const category = categories.find((c) => c.name === name);
  if (category) {
    document.getElementById("categoryName").value = category.name;
    document.getElementById("categoryImage").value = category.imageUrl;
  }
}

function handleProductForm() {
  const form = document.getElementById("productForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("productId").value;
    const product = {
      id: id
        ? parseInt(id)
        : products.length
        ? Math.max(...products.map((p) => p.id)) + 1
        : 1,
      name: document.getElementById("productNameInput").value,
      category: document.getElementById("productCategory").value,
      price: parseFloat(document.getElementById("productPrice").value),
      description: document.getElementById("productDescription").value,
      imageUrl: document.getElementById("productImage").value,
      featured: document.getElementById("productFeatured").checked,
    };
    if (id) {
      const index = products.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        products[index] = product;
      }
    } else {
      products.push(product);
    }
    saveProducts();
    displayAdminProducts();
    displayProducts();
    displayFeaturedProducts();
    form.reset();
    document.getElementById("productId").value = "";
    alert("Product saved successfully!");
  });
  document.getElementById("clearProductForm").addEventListener("click", () => {
    form.reset();
    document.getElementById("productId").value = "";
  });
}

function handleCategoryForm() {
  const form = document.getElementById("categoryForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("categoryName").value;
    const imageUrl = document.getElementById("categoryImage").value;
    const index = categories.findIndex((c) => c.name === name);
    if (index !== -1) {
      categories[index].imageUrl = imageUrl;
    } else {
      categories.push({ name, imageUrl });
    }
    saveCategories();
    displayAdminCategories();
    alert("Category updated successfully!");
  });
}

function handleCustomerForm() {
  const form = document.getElementById("customerForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    customer.name = document.getElementById("customerNameInput").value;
    customer.email = document.getElementById("customerEmailInput").value;
    customer.address = document.getElementById("customerAddressInput").value;
    saveCustomer();
    displayAccount();
    alert("Customer details updated successfully!");
  });
}

function handlePaymentMethods() {
  const paymentOptions = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );
  const paymentDetails = document.querySelectorAll(".payment-details");
  paymentOptions.forEach((option) => {
    option.addEventListener("change", () => {
      paymentDetails.forEach((detail) => (detail.style.display = "none"));
      document.getElementById(`${option.value}-details`).style.display =
        "block";
    });
  });
}

if (document.getElementById("productContainer")) {
  displayProducts();
}

if (document.getElementById("featuredProductContainer")) {
  displayFeaturedProducts();
}

if (document.getElementById("productName")) {
  displayProductDetail();
}

if (document.getElementById("cartItems")) {
  displayCart();
}

if (document.getElementById("customerName")) {
  displayAccount();
}

if (document.getElementById("productList")) {
  displayAdminProducts();
  handleProductForm();
}

if (document.getElementById("categoryList")) {
  displayAdminCategories();
  handleCategoryForm();
}

if (document.getElementById("customerForm")) {
  document.getElementById("customerNameInput").value = customer.name;
  document.getElementById("customerEmailInput").value = customer.email;
  document.getElementById("customerAddressInput").value = customer.address;
  handleCustomerForm();
}

if (document.getElementById("orderSummary")) {
  displayOrderSummary();
  handlePaymentMethods();
}

if (document.getElementById("orderId")) {
  displayConfirmation();
}

if (document.getElementById("loginForm")) {
  handleLogin();
}

if (document.getElementById("signupForm")) {
  handleSignup();
}

checkAdminAccess();
updateCartCount();

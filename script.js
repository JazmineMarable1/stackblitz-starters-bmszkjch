// ========================================
// BOOK HAVEN BOOKSTORE
// JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  // ----------------------------------------
  // NEWSLETTER SUBSCRIPTION
  // ----------------------------------------

  const newsletterForms = document.querySelectorAll(".newsletter-form");

  newsletterForms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      alert("Thank you for subscribing.");

      form.reset();
    });
  });


  // ----------------------------------------
  // SHOPPING CART
  // Uses sessionStorage
  // ----------------------------------------

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const viewCartButton = document.getElementById("view-cart");
  const cartModal = document.getElementById("cart-modal");
  const closeCartButton = document.getElementById("close-cart");
  const clearCartButton = document.getElementById("clear-cart");
  const processOrderButton = document.getElementById("process-order");
  const cartItems = document.getElementById("cart-items");


  // Retrieve the current cart from sessionStorage.
  function getCart() {
    const storedCart = sessionStorage.getItem("bookHavenCart");

    if (storedCart) {
      return JSON.parse(storedCart);
    }

    return [];
  }


  // Save the cart to sessionStorage.
  function saveCart(cart) {
    sessionStorage.setItem("bookHavenCart", JSON.stringify(cart));
  }


  // Add products to the shopping cart.
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      const itemName = button.dataset.item;
      const cart = getCart();

      cart.push(itemName);

      saveCart(cart);

      alert("Item added.");
    });
  });


  // Display cart contents inside the modal.
  function displayCart() {
    const cart = getCart();

    if (!cartItems) {
      return;
    }

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    const list = document.createElement("ul");

    cart.forEach(function (item) {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.appendChild(listItem);
    });

    cartItems.innerHTML = "";
    cartItems.appendChild(list);
  }


  // Open shopping cart.
  if (viewCartButton && cartModal) {
    viewCartButton.addEventListener("click", function () {
      displayCart();
      cartModal.hidden = false;
    });
  }


  // Close shopping cart.
  if (closeCartButton && cartModal) {
    closeCartButton.addEventListener("click", function () {
      cartModal.hidden = true;
    });
  }


  // Close modal when clicking outside the cart window.
  if (cartModal) {
    cartModal.addEventListener("click", function (event) {
      if (event.target === cartModal) {
        cartModal.hidden = true;
      }
    });
  }


  // Clear shopping cart and sessionStorage.
  if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {

      sessionStorage.removeItem("bookHavenCart");

      displayCart();

      alert("Cart cleared.");
    });
  }


  // Process the order and clear sessionStorage.
  if (processOrderButton) {
    processOrderButton.addEventListener("click", function () {

      sessionStorage.removeItem("bookHavenCart");

      displayCart();

      alert("Thank you for your order.");

      if (cartModal) {
        cartModal.hidden = true;
      }
    });
  }


  // ----------------------------------------
  // CONTACT / CUSTOM ORDER FORM
  // Uses localStorage
  // ----------------------------------------

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const customerRequest = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        requestType: document.getElementById("request-type").value,
        message: document.getElementById("message").value,
        contactPermission:
          document.getElementById("contact-permission").checked
      };

      localStorage.setItem(
        "bookHavenCustomerRequest",
        JSON.stringify(customerRequest)
      );

      alert("Thank you! Your request has been submitted.");

      contactForm.reset();
    });
  }

});

// NEWSLETTER FORM
const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newsletterEmail = document.getElementById("newsletter-email").value;

    localStorage.setItem("bookHavenNewsletterEmail", newsletterEmail);

    alert("Thank you for subscribing to the Book Haven newsletter!");

    newsletterForm.reset();
  });
}
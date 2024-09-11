async function fetchAllCart(list) {
  let cartList = JSON.parse(localStorage.getItem("cartList"));
  let subtotalPrice;
  let totalPrice;
  let cartTotalPrice;
  setTimeout(() => {
    const cart = document.querySelector(".cart__container");
    let incrementBtn = document.querySelectorAll(".increment");
    let decrementBtn = document.querySelectorAll(".decrement");
    let inputs = document.querySelectorAll(".cartItem__units--input");
    let cardDelete = document.querySelectorAll(".deleteCart");
    cartTotalPrice = document.querySelectorAll(".cartItem__total");
    subtotalPrice = document.querySelector(".subTotal-price");
    totalPrice = document.querySelector(".totalPrice");

    incrementBtn.forEach((item, idx) => {
      item.addEventListener("click", () => {
        changeCartInfo(idx, true);
      });
      decrementBtn[idx].addEventListener("click", () =>
        changeCartInfo(idx, false)
      );
      // cardDelete[idx].addEventListener("click", () => {
      //   cartList.splice(idx, 1);
      //   cardDelete[idx].closest(".cartItem").remove();
      //   showTotalPrice();
      //   localStorage.setItem("cartList", JSON.stringify(cartList));
      // });
    });
    cart.addEventListener("click", (e) => {
      // if (e.target.closest(".cartItem")) {
      // if (e.target)
      // }
      let product = e.target.closest(".cartItem");
      if (e.target.classList.contains("deleteCart")) {
        deleteItem(product.dataset.id);
        // console.log(product.dataset.id);
      }
    });

    function deleteItem(id) {
      localStorage.setItem(
        "cartList",
        JSON.stringify(cartList.filter((prdc) => prdc.id !== +id))
      );
      updateCartlistStorage();
    }
    function updateCartlistStorage() {
      cartList = JSON.parse(localStorage.getItem("cartList"));
    }
    function changeCartInfo(idx, isUp) {
      if (isUp) {
        inputs[idx].value = parseInt(inputs[idx].value) + 1;
      } else {
        inputs[idx].value =
          parseInt(inputs[idx].value) > 1 ? parseInt(inputs[idx].value) - 1 : 1;
      }
      cartList[idx].quantity = parseInt(inputs[idx].value);

      cartList[idx].subTotal =
        cartList[idx].initialPrice * cartList[idx].quantity;

      cartTotalPrice[idx].textContent = `$${cartList[idx].subTotal.toFixed(2)}`;

      showTotalPrice();
      localStorage.setItem("cartList", JSON.stringify(cartList));
    }
  }, 0);

  setTimeout(() => {
    showTotalPrice();
  }, 100);

  function showTotalPrice() {
    let subTotal = 0;
    // cartTotalPrice.forEach((item) => {
    // item = item.textContent.trim().split("");
    // item.shift();
    // subTotal += +item.join("");
    // });

    cartList.forEach((item, idx) => {
      subTotal += item.subTotal;
    });
    console.log(cartList);

    subtotalPrice.textContent = `$${subTotal.toFixed(2)}`;
    totalPrice.textContent = `$${subTotal.toFixed(2)}`;
  }

  let cartContainer = document.querySelector(".cart__container");
  cartContainer.innerHTML = "";

  console.log(list);

  list.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cartItem";
    cartItem.dataset.id = item.id;
    cartItem.innerHTML = `
      <div class="cartItem__img-name flex-center">
        <span class="flex-center deleteCart" tabindex="-1">X</span>
        <img src="${item.images[0]}" alt="cartItem image">
        <p>${item.title}</p>
      </div>
      <div class="cartItem__price">
        <p>$${item.price}</p>
      </div>
      <div class="cartItem__units">
        <button class="increment"><i class="fa-solid fa-chevron-up"></i></button>
        <input type="number" class="cartItem__units--input" value="1" id="numberInput">
        <button class="decrement"><i class="fa-solid fa-chevron-down"></i></button>
      </div>
      <div class="cartItem__total">
        $${item.price}
      </div>
      `;
    cartContainer.appendChild(cartItem);
  });
}

export default fetchAllCart;

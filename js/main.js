//Jquery
// first slider
$(document).ready(function() {
  $('.slider-one')
    .not('slick-initialized')
    .slick({
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      prevArrow: ".site-slider .slider-btn .prev",
      nextArrow: ".site-slider .slider-btn .next"

    });

  //second slider
  $('.slider-two')
    .not('slick-initialized')
    .slick({

      prevArrow: ".site-slider-two .prev",
      nextArrow: ".site-slider-two .next",
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplaySpeed: 3000,


    });





});

//Vanilla js
// cart functons
let carts = document.querySelectorAll('.add-cart');
let products = [{
    name: 'Ankara Dress',
    tag: 'dress1',
    price: 2500,
    inCart: 0
  }, {
    name: 'Red lace Dress',
    tag: 'dress2',
    price: 3500,
    inCart: 0
  }, {
    name: 'Lace Slim Fashion Dress',
    tag: 'dress3',
    price: 4000,
    inCart: 0
  }, {
    name: 'Floro Print Boho Dress',
    tag: 'dress4',
    price: 9500,
    inCart: 0
  }, {
    name: 'Shibeva Casual Dress',
    tag: 'dress5',
    price: 5000,
    inCart: 0
  }, {
    name: 'Star Lace Prom Dress',
    tag: 'dress6',
    price: 3900,
    inCart: 0
  }, {
    name: 'Vintage slit long skirt',
    tag: 'skirt1',
    price: 1500,
    inCart: 0
  },
  {
    name: 'Top Grade Fascinator Hat',
    tag: 'head1',
    price: 2100,
    inCart: 0
  }, {
    name: 'Winter Hat',
    tag: 'head2',
    price: 1500,
    inCart: 0
  }, {
    name: 'Vintage Woman Fedora Hat',
    tag: 'head3',
    price: 2000,
    inCart: 0
  }, {
    name: 'Women Bucket Hat',
    tag: 'head4',
    price: 500,
    inCart: 0
  }, {
    name: 'Winter Beret Cap',
    tag: 'head5',
    price: 1200,
    inCart: 0
  }, {
    name: 'Ankara Head Band',
    tag: 'head6',
    price: 1900,
    inCart: 0
  },
  {
    name: 'Loose Summer Top',
    tag: 'top1',
    price: 1100,
    inCart: 0
  }, {
    name: 'Lapel Striped Block Shirt',
    tag: 'top2',
    price: 4500,
    inCart: 0
  }, {
    name: 'Model office Shirt',
    tag: 'top3',
    price: 2000,
    inCart: 0
  }, {
    name: 'African Print Top',
    tag: 'top4',
    price: 5500,
    inCart: 0
  }, {
    name: 'Irregular long sleeved top',
    tag: 'top5',
    price: 6300,
    inCart: 0
  }, {
    name: 'Fashion hoodies',
    tag: 'top6',
    price: 1000,
    inCart: 0
  },
  {
    name: 'Wool Fabric Spandex',
    tag: 'pant1',
    price: 5000,
    inCart: 0
  }, {
    name: 'Loose High Waist',
    tag: 'pant2',
    price: 1500,
    inCart: 0
  }, {
    name: 'Gray Casual Trousers',
    tag: 'pant3',
    price: 2000,
    inCart: 0
  }, {
    name: 'Button office Trouser',
    tag: 'pant4',
    price: 4500,
    inCart: 0
  }, {
    name: 'Baggy Slacks Pants',
    tag: 'pant5',
    price: 5800,
    inCart: 0
  }, {
    name: 'High-slit layered Pallazo',
    tag: 'pant6',
    price: 3000,
    inCart: 0
  }

];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}
// code for loading products on cart even after refreshing website
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart-icon span').textContent = productNumbers;
  }
}

function cartNumbers(product) {

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart-icon span').textContent = productNumbers + 1;


  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart-icon span').textContent = 1;
  }
  setItems(product);
}

function setItems(prod) {

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[prod.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [prod.tag]: prod
      }
    }
    cartItems[prod.tag].inCart += 1;
  } else {
    prod.inCart = 1;
    cartItems = {
      [prod.tag]: prod
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(prodcost) {
  // console.log("The products price is", prodcost.price);
  let cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + prodcost.price);

  } else {
    localStorage.setItem("totalCost", prodcost.price);
  }

}

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem('totalCost');
  if (cartItems && productContainer) {

    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class="product">

        <div class="row text-center">
        <ion-icon type="button" name="trash-outline"></ion-icon>
          <div class="products col-md-3 pt-md-3 pt-4 image">
          <img image src="./assets/${item.tag}.jpg" width="100%">
          <span>${item.name}</span>
          </div>

          <div class="price col-md-3 pt-md-3 pt-4">
            <span>${item.price} KES</span>
          </div>
          <div class="quantity col-md-3 pt-md-3 pt-4">
            <ion-icon name="caret-back-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="caret-forward-circle-outline"></ion-icon>
          </div>
          <div class="total col-md-2 pt-md-3 pt-4">
              <span>${item.inCart * item.price}KES</span>
          </div>

        </div><hr>


        </div>
      `
    });

    productContainer.innerHTML += `
      <div class="cartTotalContainer">
        <h6 class="cartTitle">Cart Total</h6>
        <h5 class="cartTotal">${cartCost}KES</h5>
      </div>
      <div class="cartTotalContainer">
        <button type="button" class="btn btn-group btn-info" onclick="localStorage.clear(),window.location.href='./asante.html'">BUY NOW</button>
      </div>

    `

  }
}

onLoadCartNumbers();
displayCart()
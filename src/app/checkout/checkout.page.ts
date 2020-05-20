import { Component, OnInit } from '@angular/core';
import { cpus } from 'os';

declare var RazorpayCheckout: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  paymentAmount: number = 333;
  currency: string = 'INR';
  currencyIcon: string = '₹';
  razor_key = 'rzp_test_5uyx8IBNWUj4uF';
  cardDetails: any = {};

  constructor() { }

  

  ngOnInit() {
    onLoadCartNumber();
    displayCart();

    let decButton = document.getElementsByClassName('decrease-button');
    let incButton = document.getElementsByClassName('increase-button');
    let removeItem = document.getElementsByClassName('close');
    let payButton = document.getElementsByClassName('pay');

    console.log("payButton",payButton);

    for (let i = 0; i < decButton.length; i++){
      var button = decButton[i];
      button.addEventListener('click', function(){
        var buttonClicked = event.target;
        var quantityContainer = buttonClicked.parentElement;
        var tag = quantityContainer.getElementsByClassName('tag')[0].innerText;
        decreaseInCartQuantity(tag);
      })
    }
    
    for (let i = 0; i < incButton.length; i++){
      var button = incButton[i];
        button.addEventListener('click', function(){
        var buttonClicked = event.target;
        var quantityContainer = buttonClicked.parentElement;
        var tag = quantityContainer.getElementsByClassName('tag')[0].innerText;
        increaseInCartQuantity(tag);
      })
    }

    for (let i = 0; i < removeItem.length; i++){
      var button = removeItem[i];
        button.addEventListener('click', function(){
          console.log("Close Button is working");
          var buttonClicked = event.target;
          var quantityContainer = buttonClicked.parentElement;
          var tag = quantityContainer.getElementsByClassName('tag')[0].innerText;
          console.log("tag", tag);
          removeItemFromCart(tag);
      })
    }
    for (let i = 0; i < payButton.length; i++){
      var button = payButton[i];
      button.addEventListener('click', function(){ 
        payWithRazor();
      })
    }
  }
}

function onLoadCartNumber() { // To display cart quantity in checkout button
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.checkout span').textContent = productNumbers;
  }
}

function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems =JSON.parse(cartItems);
  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem("totalCost");
  let cartNumbers = localStorage.getItem("cartNumbers");
  if (cartItems && productContainer && cartNumbers >= 1 ){
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item =>{
      if (item.inCart >= 1) {
        productContainer.innerHTML += `
        <div class="card" style = "box-shadow: 0 4px 8px 0 rgba(0,0,0,1);
                          transition: 0.3s; width: 25%; height: 160px;">
          <ion-icon class ="close" name="close-circle"></ion-icon>
          <div class ="product"style = "width: 150px; height: 180px;" >
              <img src="assets/images/${item.tag}.jpg" style = "width: 120px; height: 100px;"> 
              <span>${item.name}</span><span class="tag" hidden>${item.tag}</span>
          </div> 
        </div>  
  
        <div class ="price" style ="width: 30%;text-align: center;"><i class="fa fa-rupee"> ${item.price}.00</i></div> 
        
        <div class= "quantity" style = "width: 20%;text-align: left;">
          <div class = "quantity-container">
          <span class="tag" hidden>${item.tag}</span>
            <ion-icon class ="decrease-button" name="remove-circle-sharp" style = "width = 10%"> </ion-icon>
            <span id="inCart">${item.inCart}</span>
            <ion-icon class ="increase-button" name="add-circle-sharp" style = "width = 10%"> </ion-icon> 
          </div>
        </div>
  
        <div style = "width: 20%;text-align: center;">
          <i class="fa fa-rupee"> <span id="total">${item.inCart * item.price}.00 </span></i>
        </div>   
        `;
      }
      
    })
    productContainer.innerHTML += `
    <ion-card class="welcome-card">  
      <ion-card-content>  
        <div class style="margin-left:520px;>
          <h3 class ="basketTotalTitle">
            Basket Total
          </h3>
          <h1 class="basketTotal">
          <i class="fa fa-rupee"> ${cartCost}.00</i>
          </h1></div>
          <ion-button class ="pay" expand="full" color="success">Pay</ion-button>
      </ion-card-content>
    </ion-card>`
 } else {
  productContainer.innerHTML = `<img src="assets/images/empty-cart.png" style = "height: 500px;"> `;
  localStorage.clear();
 }

}

  
function decreaseInCartQuantity(tag){
  let cartItems = localStorage.getItem("productsInCart");
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem("totalCost");
  productNumbers = parseInt(productNumbers); 
  cartCost = parseInt(cartCost);
  cartItems = JSON.parse(cartItems);
  cartItems[tag].inCart -= 1;
  localStorage.setItem("productsInCart",JSON.stringify(cartItems));
  localStorage.setItem('cartNumbers', productNumbers - 1);  
  document.querySelector('.checkout span').textContent = productNumbers - 1;
  localStorage.setItem("totalCost", cartCost - cartItems[tag].price);
  location.reload();
}

function increaseInCartQuantity(tag){
  let cartItems = localStorage.getItem("productsInCart");
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem("totalCost");
  productNumbers = parseInt(productNumbers); 
  cartCost = parseInt(cartCost);
  cartItems = JSON.parse(cartItems);
  cartItems[tag].inCart += 1;
  localStorage.setItem("productsInCart",JSON.stringify(cartItems));
  localStorage.setItem('cartNumbers', productNumbers + 1);  
  document.querySelector('.checkout span').textContent = productNumbers + 1;
  localStorage.setItem("totalCost", cartCost + cartItems[tag].price);
  location.reload();
}

function removeItemFromCart(tag){
let cartItems = localStorage.getItem("productsInCart");
let productNumbers = localStorage.getItem('cartNumbers');
let cartCost = localStorage.getItem("totalCost");
productNumbers = parseInt(productNumbers); 
cartCost = parseInt(cartCost);
cartItems = JSON.parse(cartItems);
console.log("cartItems", cartItems);
let removeItemCost = cartItems[tag].inCart * cartItems[tag].price;
localStorage.setItem('cartNumbers', productNumbers - cartItems[tag].inCart);
document.querySelector('.checkout span').textContent = productNumbers - cartItems[tag].inCart; 
localStorage.setItem("totalCost", cartCost - removeItemCost);
console.log("removeItemCost",removeItemCost);
cartItems[tag].inCart = 0;
localStorage.setItem("productsInCart",JSON.stringify(cartItems));
location.reload();
}

function payWithRazor() {
  console.log("Function payWithRazor is executing");
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_5uyx8IBNWUj4uF',
    amount: 100,
    name: 'foo',
    prefill: {
      email: 'sunil.govind@kaynestechnology.net',
      contact: '9686668191',
      name: 'Sunil Govind'
    },
    theme: {
      color: '#1F1F20'
    },
    modal: {
      ondismiss: function () {
        alert('dismissed')
      }
    }
  };

  var successCallback = function (payment_id) {
    alert('payment_id: ' + payment_id);
  };

  var cancelCallback = function (error) {
    alert(error.description + ' (Error ' + error.code + ')');
  };

  RazorpayCheckout.open(options, successCallback, cancelCallback);
}
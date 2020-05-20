import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  ngOnInit() {
    onLoadCartNumber();
  };
  myFunction(){
    let carts = document.querySelectorAll('.add-cart');
    let products = [
      {
        name : "Kurkure Masala Munch",
        tag :  "kurkure_masala_munch",
        price : 10,
        inCart: 0
      },
      {
        name : "Kurkure Chilli Chataka",
        tag :  "kurkure_chilli_chatka",
        price : 15,
        inCart: 0
      },
      {
        name : "Kurkure Gazab Golab",
        tag :  "kurkure_gazab_golmaal",
        price : 20,
        inCart: 0
      },
      {
        name : "Kurkure Traingles",
        tag :  "kurkure_triangles",
        price : 25,
        inCart: 0
      },
      {
        name : "Lay's American Style Cream & Onion",
        tag :  "lays_american",
        price : 20,
        inCart: 0
      },
      {
        name : "Lay's Classic",
        tag :  "lays_classic",
        price : 20,
        inCart: 0
      }, 
      {
        name : "Lay's Salt & Vinegar Flavored",
        tag :  "lays_salt",
        price : 20,
        inCart: 0
      },
      {
        name : "Lay's Tomoto Tango",
        tag :  "lays_tomoto",
        price : 20,
        inCart: 0
      },
      {
        name : "Coca-Cola (250ml)",
        tag :  "coca_cola_250ml",
        price : 20,
        inCart: 0
      },
      {
        name : "Mirinda (250ml)",
        tag :  "mirinda_250ml",
        price : 20,
        inCart: 0
      },
      {
        name : "Pepsi (250ml)",
        tag :  "pepsi_250ml",
        price : 20,
        inCart: 0
      },
      {
        name : "7up (250ml)",
        tag :  "7up_250ml",
        price : 20,
        inCart: 0
      }
    ]
     for (let i=0; i < carts.length; i++){
      carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        location.reload();
        totalCost(products[i]);
      })
    }
  }
 
}
 function cartNumbers(product) { // Updatating Cart Item Quantity in localstorage
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers); 
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);  
    document.querySelector('.checkout span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.checkout span').textContent = 1;
  } 
  setItems(product);
}

function setItems(product) { // Adding item to the locasStorage
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined){
        cartItems = {
          ...cartItems,
          [product.tag]: product
        }
    }
    cartItems[product.tag].inCart += 1;
  }else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
  }  
  }
  localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product) { // updatating total cost of cart
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null){  
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
  }else {
      localStorage.setItem("totalCost",product.price);
  }
}
function onLoadCartNumber() { // Refreshing Cart Qty in checkout button
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.checkout span').textContent = productNumbers;
  } 
}
import { Cart } from "./modules/cartModule.js";
import { General } from "./modules/generalModule.js";
const cartClass=new Cart();
const general=new General();
const page=localStorage.getItem('page');
const cartIcon=document.querySelector('.cartIcon');
const cart=document.querySelector('.cart');

cart.addEventListener('click',function(e){
    const id=e.target.id
    if(id !== 'minus' && id !== 'plus' && id !== 'check' && id !== 'remove' && id !== 'delete' )
        cart.classList.add('d-none');
})


cartIcon.addEventListener('click',function(e){
    cart.innerHTML='';
    cart.classList.remove('d-none');
    cart.appendChild(cartClass.createCart());
})


if(page === 'product'){
    const addToCart=document.querySelector('.addToCart');
    addToCart.addEventListener('click',function(e){
        e.preventDefault();
        const cartItems=(localStorage.getItem('cartItems'))?JSON.parse(localStorage.getItem('cartItems')):[];
        const price=document.querySelector('#price').innerHTML;
        const  qty=document.querySelector('#qty').innerHTML;
        const cartName=document.querySelector('.cartName').getAttribute('value')
        const cartImage=document.querySelector('.cartImage').getAttribute('src')
        const productName=document.querySelector('#productName').innerHTML;
        const checkItemExists=cartItems.filter(cartItem=> cartItem.productName === productName);
        if(checkItemExists.length === 0 ){
            cartItems.push({
                productName,qty:Number(qty),price:price,id:cartItems.length,cartImage,cartName
            })}
        else{
            const  olderProductId=checkItemExists[0].id;
            cartItems[olderProductId].qty=Number(qty);
        }
    
            localStorage.setItem('cartItems',JSON.stringify(cartItems));
    });
    const plus=document.querySelector('#plus');
    const minus=document.querySelector('#minus');
    const  qty=document.querySelector('#qty');


    plus.addEventListener('click',(e)=> general.increaseQuantity(e,qty));
    minus.addEventListener('click',(e)=> general.decreaseQuantity(e,qty));
}





//adde delete to cart
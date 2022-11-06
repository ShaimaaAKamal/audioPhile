import { Cart } from "./modules/cartModule.js";
import { General } from "./modules/generalModule.js";
const cartClass=new Cart();
const general=new General();
const addToCart=document.querySelector('.addToCart');
const cartIcon=document.querySelector('.cartIcon');
const cart=document.querySelector('.cart');

cart.addEventListener('click',function(e){
    const id=e.target.id
    if(id !== 'minus' && id !== 'plus' && id !== 'check' && id !== 'remove' )
        cart.classList.add('d-none');
})

cartIcon.addEventListener('click',function(e){
    cart.innerHTML='';
    cart.classList.remove('d-none');
    cart.appendChild(cartClass.createCart());
})
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
})


const plus=document.querySelector('#plus');
const minus=document.querySelector('#minus');
const  qty=document.querySelector('#qty');


plus.addEventListener('click',(e)=> general.increaseQuantity(e,qty));
minus.addEventListener('click',(e)=> general.decreaseQuantity(e,qty));


// function createElem(element,attributes){
//     const Element=document.createElement(element);
//     setAtt(Element,attributes);
//     return Element;
// }

// function setAtt(element,attribues){
//     attribues.forEach(attr => {
//          element.setAttribute(attr.key,attr.value);
//     });
// }

// function createCart(){
//     const cartItems=(localStorage.getItem('cartItems'))?JSON.parse(localStorage.getItem('cartItems')):[];
//     const cartDiv=createElem('div',[{key:'class',value:"bg-white p-4 cartWidth  rounded-2 position-relative"}]);
//     if(cartItems.length === 0){
//         const empty=createEmptyCart();
//         const cartHeading=createCartHeading(cartItems.length,'empty');
//         cartDiv.appendChild(cartHeading);
//         cartDiv.appendChild(empty);        
//     }else{
//         const cartHeading=createCartHeading(cartItems.length);
//         cartDiv.appendChild(cartHeading);
//         cartItems.forEach(cartItem => 
//            cartDiv.appendChild(createCartItem(cartItem,cartItems)))
//        const checkout=createElem('a',[{key:'class',value:"py-2 px-4 border-0 mainBtn text-center w-100 d-inline-block text-decoration-none"},{key:'href',value:'checkout.html'},,{key:'id',value:'check'}]);
//        checkout.innerHTML=`CHECKOUT`;
//        cartDiv.appendChild(checkout);
//     }
// return cartDiv;
// }

// function createCartHeading(cartLength,empty=''){
//     const div=createElem('div',[{key:'class',value:"d-flex justify-content-between mb-4 align-items-center"}]);
//     const h6=createElem('h6',[{key:'class',value:"text-uppercase"}]);
//     h6.innerHTML=`Cart (${cartLength})`;
//    div.appendChild(h6);
//    if(!empty){
//     const a=createElem('a',[{key:'class',value:"text-black-50 small"},{key:"href",value:"#"},,{key:'id',value:'remove'}]);
//     a.innerHTML='Remove all'
//     div.appendChild(a);
//     a.addEventListener('click',function(e){
//         e.preventDefault();
//         localStorage.setItem('cartItems',JSON.stringify([]));
//         cart.innerHTML=''
//         cart.appendChild(createCart());
//     })
//    }
//    return div;
// }

// function createEmptyCart(){
//     const div=createElem('div',[{key:'class',value:"text-center"}]);
//     div.innerHTML=`<svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
//     <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="#D87D4A" fill-rule="nonzero"/>
//   </svg>`
//   const h6=createElem('h6',[{key:'class',value:"mt-2 small text-black-50"}]);
//   h6.innerHTML=`Your Cart is Empty`;
//   div.appendChild(h6);
//   return div;
// }

// function createCartItem(cartItem,cartItems){
//         const parentDiv=createElem('div',[{key:'class',value:"d-flex justify-content-between align-items-center mb-4"}]);
//         const div=createElem('div',[{key:'class',value:'d-flex align-items-center'}]);
//         const img=createElem('img',[{key:'class',value:"rounded-3 me-3 w25"},{key:'alt',value:'image'},{key:'src',value:cartItem.cartImage}]);
//         div.appendChild(img);
//         const info=createCartItemInfo(cartItem);
//         div.appendChild(info);
//         const qty=createCartItemQty(cartItem,cartItems);
//         parentDiv.appendChild(div);
//         parentDiv.appendChild(qty);
//         return parentDiv;
// }

// function createCartItemInfo(cartItem){
//     const div=createElem('div',[{key:'class',value:"d-flex flex-column"}]);
//     const span1=createElem('span',[{key:'class',value:"fb text-black  mb-1"}]);
//     span1.innerHTML=cartItem.cartName;
//     const span2=createElem('span',[{key:'class',value:"text-black-50 fw-semibold small"}]);
//     span2.innerHTML=cartItem.price;
//     div.appendChild(span1);
//     div.appendChild(span2);
//     return div;
// }

// function createCartItemQty(cartItem,cartItems){
//     const div=createElem('div',[{key:'class',value:"bg-gray py-1 border-0  d-flex align-items-center  text-black small"}]);
//     const minus=createElem('a',[{key:'class',value:"opacity-50 px-3 text-decoration-none text-reset updateQuantity"},{key:'href',value:'#'},{key:'id',value:'minus'}]);
//     minus.innerHTML=`-`;
//     div.appendChild(minus);
//     const span=createElem('span',[]);
//     span.innerHTML=`${cartItem.qty}`;
//     div.appendChild(span);
//     const plus=createElem('a',[{key:'class',value:"updateQuantity opacity-50 px-3 text-reset text-decoration-none"},{key:'href',value:'#'},{key:'id',value:'plus'}]);
//     plus.innerHTML=`+`;
//     div.appendChild(plus);
//     plus.addEventListener('click',(e)=> {
//         general.increaseQuantity(e,span);
//         cartItems[cartItem.id].qty=span.innerHTML
//         localStorage.setItem('cartItems',JSON.stringify(cartItems))
//     });
//     minus.addEventListener('click',(e)=> {general.decreaseQuantity(e,span);
//         cartItems[cartItem.id].qty=span.innerHTML
//         localStorage.setItem('cartItems',JSON.stringify(cartItems))
//     });
//     return div;
// }



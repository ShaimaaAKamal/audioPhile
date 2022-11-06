import { Cart } from "./modules/cartModule.js";
const cartClass=new Cart();
const addToCart=document.querySelector('.addToCart');
const cartIcon=document.querySelector('.cartIcon');
cartIcon.addEventListener('click',function(e){
   const cart= createCart();
   document.body.prepend(cart);
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

plus.addEventListener('click',function(e){
    e.preventDefault();
    let  qtyNumber=Number(qty.innerHTML)
    qty.innerHTML=qtyNumber+1;
})

minus.addEventListener('click',function(e){
    e.preventDefault();
    let  qtyNumber=Number(qty.innerHTML)
    if(qtyNumber >=2)
    qty.innerHTML=qtyNumber-1;
    else{
        minus.classList.add('disabled');
    }
     
})


function createElem(element,attributes){
    const Element=document.createElement(element);
    setAtt(Element,attributes);
    return Element;
}

function setAtt(element,attribues){
    attribues.forEach(attr => {
         element.setAttribute(attr.key,attr.value);
    });
}

function createCart(){
    const cartItems=(localStorage.getItem('cartItems'))?JSON.parse(localStorage.getItem('cartItems')):[];
    const section=createElem('section',[{key:'class',value:"cart s bg-black w-100 bg-opacity-50 vh-100 p-5"}]);
    const cartDiv=createElem('div',[{key:'class',value:"bg-white p-4 cartWidth  rounded-2 position-relative"}]);
    const cartHeading=createCartHeading(cartItems.length);
    section.appendChild(cartDiv);
    cartDiv.appendChild(cartHeading);
    cartItems.forEach(cartItem => 
       cartDiv.appendChild(createCartItem(cartItem)))
   const checkout=createElem('a',[{key:'class',value:"py-2 px-4 border-0 mainBtn text-center w-100 d-inline-block text-decoration-none"},{key:'href',value:'checkout.html'},,{key:'id',value:'check'}]);
   checkout.innerHTML=`CHECKOUT`;
   cartDiv.appendChild(checkout);
   section.addEventListener('click',function(e){
         const id=e.target.id
         if(id !== 'minus' && id !== 'plus' && id !== 'check' && id !== 'remove' )
             section.classList.add('d-none');
   })
   return section;
}

function createCartHeading(cartLength){
    const div=createElem('div',[{key:'class',value:"d-flex justify-content-between mb-4 align-items-center"}]);
    const h6=createElem('h6',[{key:'class',value:"text-uppercase"}]);
    h6.innerHTML=`Cart (${cartLength})`;
    const a=createElem('a',[{key:'class',value:"text-black-50 small"},{key:"href",value:"#"},,{key:'id',value:'remove'}]);
    a.innerHTML='Remove all'
   div.appendChild(h6);
   div.appendChild(a);
   return div;
}

function createCartItem(cartItem){
        const parentDiv=createElem('div',[{key:'class',value:"d-flex justify-content-between align-items-center mb-4"}]);
        const div=createElem('div',[{key:'class',value:'d-flex align-items-center'}]);
        const img=createElem('img',[{key:'class',value:"rounded-3 me-3 w25"},{key:'alt',value:'image'},{key:'src',value:cartItem.cartImage}]);
        div.appendChild(img);
        const info=createCartItemInfo(cartItem);
        div.appendChild(info);
        const qty=createCartItemQty(cartItem);
        parentDiv.appendChild(div);
        parentDiv.appendChild(qty);
        return parentDiv;
}

function createCartItemInfo(cartItem){
    const div=createElem('div',[{key:'class',value:"d-flex flex-column"}]);
    const span1=createElem('span',[{key:'class',value:"fb text-black  mb-1"}]);
    span1.innerHTML=cartItem.cartName;
    const span2=createElem('span',[{key:'class',value:"text-black-50 fw-semibold small"}]);
    span2.innerHTML=cartItem.price;
    div.appendChild(span1);
    div.appendChild(span2);
    return div;
}

function createCartItemQty(cartItem){
    const div=createElem('div',[{key:'class',value:"bg-gray py-1 border-0  d-flex align-items-center  text-black small"}]);
    const minus=createElem('a',[{key:'class',value:"opacity-50 px-3 text-decoration-none text-reset updateQuantity"},{key:'href',value:'#'},{key:'id',value:'minus'}]);
    minus.innerHTML=`-`;
    div.appendChild(minus);
    const span=createElem('span',[]);
    span.innerHTML=`${cartItem.qty}`;
    div.appendChild(span);
    const plus=createElem('a',[{key:'class',value:"updateQuantity opacity-50 px-3 text-reset text-decoration-none"},{key:'href',value:'#'},{key:'id',value:'plus'}]);
    plus.innerHTML=`+`;
    div.appendChild(plus);
    return div;
}



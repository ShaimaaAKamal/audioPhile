import { General } from "./generalModule.js";

const general=new General();

const cart=document.querySelector('.cart');

export class Cart{
     createElem(element,attributes){
        const Element=document.createElement(element);
        this.setAtt(Element,attributes);
        return Element;
    }
    
     setAtt(element,attribues){
        attribues.forEach(attr => {
             element.setAttribute(attr.key,attr.value);
        });
    }
    
     createCart(){
        const cartItems=(localStorage.getItem('cartItems'))?JSON.parse(localStorage.getItem('cartItems')):[];
        const cartDiv=this.createElem('div',[{key:'class',value:"bg-white p-4 cartWidth  rounded-2 position-relative"}]);
        const isEmpty=cartItems.filter(cartItem => cartItem !== '')
        if(isEmpty.length === 0){
            const empty=this.createEmptyCart();
            const cartHeading=this.createCartHeading(0,'empty');
            cartDiv.appendChild(cartHeading);
            cartDiv.appendChild(empty);        
        }else{
            const cartHeading=this.createCartHeading(isEmpty.length);
            cartDiv.appendChild(cartHeading);
            cartItems.forEach(cartItem => 
             (cartItem)? cartDiv.appendChild(this.createCartItem(cartItem,cartItems)):'')
           const checkout=this.createElem('a',[{key:'class',value:"py-2 px-4 border-0 mainBtn text-center w-100 d-inline-block text-decoration-none"},{key:'href',value:'checkout.html'},,{key:'id',value:'check'}]);
           checkout.innerHTML=`CHECKOUT`;
           cartDiv.appendChild(checkout);
        }
    return cartDiv;
    }
    
     createCartHeading(cartLength,empty=''){
        const div=this.createElem('div',[{key:'class',value:"d-flex justify-content-between mb-4 align-items-center"}]);
        const h6=this.createElem('h6',[{key:'class',value:"text-uppercase"}]);
        h6.innerHTML=`Cart (${cartLength})`;
       div.appendChild(h6);
       if(!empty){
        const a=this.createElem('a',[{key:'class',value:"text-black-50 small"},{key:"href",value:"#"},,{key:'id',value:'remove'}]);
        a.innerHTML='Remove all'
        div.appendChild(a);
        self=this;
        a.addEventListener('click',function(e){
            e.preventDefault();
            localStorage.setItem('cartItems',JSON.stringify([]));
            cart.innerHTML=''
            cart.appendChild(self.createCart());
        })
       }
       return div;
    }
    
     createEmptyCart(){
        const div=this.createElem('div',[{key:'class',value:"text-center"}]);
        div.innerHTML=`<svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="#D87D4A" fill-rule="nonzero"/>
      </svg>`
      const h6=this.createElem('h6',[{key:'class',value:"mt-2 small text-black-50"}]);
      h6.innerHTML=`Your Cart is Empty`;
      div.appendChild(h6);
      return div;
    }
    
     createCartItem(cartItem,cartItems){
            const parentDiv=this.createElem('div',[{key:'class',value:"d-flex justify-content-between align-items-center mb-4"}]);
            const div=this.createElem('div',[{key:'class',value:'d-flex align-items-center'}]);
            const img=this.createElem('img',[{key:'class',value:"rounded-3 me-3 w25"},{key:'alt',value:'image'},{key:'src',value:cartItem.cartImage}]);
            div.appendChild(img);
            const info=this.createCartItemInfo(cartItem);
            div.appendChild(info);
            // const qty=this.createCartItemQty(cartItem,cartItems);
            const options=this.cartOptions(cartItem,cartItems);
            parentDiv.appendChild(div);
            // parentDiv.appendChild(qty);
            parentDiv.appendChild(options);
            return parentDiv;
    }

     cartOptions(cartItem,cartItems){
        const div=this.createElem('div',[{key:'class',value:'d-flex align-items-center'}])
        const deleteIcon =this.createElem('i',[{key:'class',value:"fa-solid fa-trash-can-arrow-up ms-2 text-site fs-4"},{key:'id',value:'delete'}]);
        const qty=this.createCartItemQty(cartItem,cartItems);
        div.appendChild(qty);
        div.appendChild(deleteIcon);
        self=this;
        deleteIcon.addEventListener('click',function(){
            cartItems.splice(cartItem.id,1,'');
            localStorage.setItem('cartItems',JSON.stringify(cartItems));
            cart.innerHTML='';
            cart.appendChild(self.createCart());
            cart.classList.remove('d-none');
        })
       return div;
    }
    
     createCartItemInfo(cartItem){
        const div=this.createElem('div',[{key:'class',value:"d-flex flex-column"}]);
        const span1=this.createElem('span',[{key:'class',value:"fb text-black  mb-1"}]);
        span1.innerHTML=cartItem.cartName;
        const span2=this.createElem('span',[{key:'class',value:"text-black-50 fw-semibold small"}]);
        span2.innerHTML=cartItem.price;
        div.appendChild(span1);
        div.appendChild(span2);
        return div;
    }
    
     createCartItemQty(cartItem,cartItems){
        const div=this.createElem('div',[{key:'class',value:"bg-gray py-1 border-0  d-flex align-items-center  text-black small"}]);
        const minus=this.createElem('a',[{key:'class',value:"opacity-50 px-3 text-decoration-none text-reset updateQuantity"},{key:'href',value:'#'},{key:'id',value:'minus'}]);
        minus.innerHTML=`-`;
        div.appendChild(minus);
        const span=this.createElem('span',[]);
        span.innerHTML=`${cartItem.qty}`;
        div.appendChild(span);
        const plus=this.createElem('a',[{key:'class',value:"updateQuantity opacity-50 px-3 text-reset text-decoration-none"},{key:'href',value:'#'},{key:'id',value:'plus'}]);
        plus.innerHTML=`+`;
        div.appendChild(plus);
        plus.addEventListener('click',(e)=> {
            general.increaseQuantity(e,span);
            cartItems[cartItem.id].qty=span.innerHTML
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
        });
        minus.addEventListener('click',(e)=> {general.decreaseQuantity(e,span);
            cartItems[cartItem.id].qty=span.innerHTML
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
        });
       
        return div;
    }   
}



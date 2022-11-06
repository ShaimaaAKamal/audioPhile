export class General{
   increaseQuantity(e){
    e.preventDefault();
    let  qtyNumber=Number(qty.innerHTML)
    qty.innerHTML=qtyNumber+1;
   }

   decreaseQuantity(e){
    e.preventDefault();
    let  qtyNumber=Number(qty.innerHTML)
    if(qtyNumber >=2)
    qty.innerHTML=qtyNumber-1;
    else{
        e.target.classList.add('disabled');
    }
   }
}
export class General{
   increaseQuantity(e,qty){
    e.preventDefault();
    let  qtyNumber=Number(qty.innerHTML)
    qty.innerHTML=qtyNumber+1;
   }

   decreaseQuantity(e,qty){
    e.preventDefault();
    let  qtyNumber=Number(qty.innerHTML)
    if(qtyNumber >=2)
    qty.innerHTML=qtyNumber-1;
    else{
        e.target.classList.add('disabled');
    }
   }

   showValidInput(errorElement,mainELement){
    errorElement.classList.add('d-none');
    mainELement.style.borderColor='#0f0';
    mainELement.previousElementSibling.children[0].style.color='#212529';
   }

   showInvalidInput(errorElement,mainELement){
   errorElement.classList.remove('d-none');
   mainELement.style.borderColor='#DC3346';
   mainELement.previousElementSibling.children[0].style.color='#DC3346';
   }
   showEmptyInput(errorElement,mainELement,event=''){
    errorElement.classList.add('d-none');
    mainELement.style.borderColor= (event === 'blur')?'#CED4DA':'#fbaf85';
    mainELement.previousElementSibling.children[0].style.color='#212529';
   }

   goBack(){
    const goBack=document.querySelector('#goBack');
    goBack.addEventListener('click',function(e){
     e.preventDefault();
     window.history.go(-1);
    })
   }
}
import { Validation } from "./validate.js";
import { General } from "./generalModule.js";
import { Cart } from "./cartModule.js";
const validate=new Validation();
const general=new General();
const cart=new Cart();
export class Checkout{
      constructor(){
        // this.name=document.querySelector('#name');
        this.email=document.querySelector('#email');
        this.phone=document.querySelector('#phone');
        // this.address=document.querySelector('#address');
        this.code=document.querySelector('#code');
        // this.city=document.querySelector('#city');
        // this.country=document.querySelector('#country');
        this.cash=document.querySelector('#cash');
        this.eMoney=document.querySelector('#e-Money');
        this.eMoneyNumber=document.querySelector('#e-MoneyNumber');
        this.eMoneyPin=document.querySelector('#e-MoneyPIN');
        this.emailError=document.querySelector('#mailError');
        this.phoneError=document.querySelector('#phoneError');
        this.codeError=document.querySelector('#codeError');
        this.pinError=document.querySelector('#pinError');
        this.eMoneyNumberError=document.querySelector('#eMoneyNumberError');
        this.elemArray=[ this.email,this.phone,this.code,this.eMoneyPin,this.eMoneyNumber]
        this.errorArray=[ this.emailError, this.phoneError,this.codeError,this.pinError,this.eMoneyNumberError];
        this.paymentMethods=document.getElementsByName('paymentMethod');
        this.formcheck=document.querySelectorAll('.form-check');
        this.cashInfo=document.querySelector('#cashInfo');
        this.eMoneyInfo=document.querySelector('#eMoneyInfo');
        this.summaryProducts=document.querySelector('#summaryProducts');
      }   

      inputsEventlistener(){
        self=this;

        this.elemArray.forEach((element,index) =>{
            element.addEventListener('keyup',function(e){
                const val=e.target.value;
               if(val !== ''){
                (self.checkValidation(e.target.id,e))? general.showValidInput(self.errorArray[index],element):general.showInvalidInput(self.errorArray[index],element);
               }else{general.showEmptyInput(self.errorArray[index],element)}
            });
        })

        this.elemArray.forEach((element,index)=> {
             element.addEventListener('blur',function(e){
                const val=e.target.value;
                if(val === ''){
                general.showEmptyInput(self.errorArray[index],element,'blur')}
                })
        });
         this.paymentMethods.forEach((element,index) =>{
            const parentElement=element.parentNode;
            parentElement.style.borderColor= (element.checked)?'#fbaf85':'#CED4DA';
            element.addEventListener('change',function(e){
                self.formcheck.forEach((formelement,key)=>{
                    formelement.style.borderColor= (element.checked && key === index )?'#fbaf85':'#CED4DA';
                }) 
                if(element.id === 'cash' && element.checked){
                    self.cashInfo.classList.remove('d-none');
                    self.eMoneyInfo.classList.add('d-none');
                }
                else if(element.id === 'e-Money' && element.checked){
                    self.cashInfo.classList.add('d-none');
                    self.eMoneyInfo.classList.remove('d-none');
                }

            })
         })
       }
    
       checkValidation(key,e){
        let status;
        const val=e.target.value;
        switch(key){
            case 'email': status=validate.validateMail(val);
                           break;
            case 'phone': status=validate.validatePhone(val);
                break;      
            case 'code': status=validate.validateCode(val);
                break;  
            case 'code': status=validate.validateCode(val);
                break;   
            case 'e-MoneyNumber': status=validate.validateEMoneyNumber(val);
                break;  
            case 'e-MoneyPIN': status=validate.validatePIN(val);
                break;        
        }
        return status
       }

       createSummaryProduct(cartItem){
        const parentDiv=cart.createElem('div',[{key:'class',value:"d-flex justify-content-between align-items-center mb-4"}]);
        const div=cart.createElem('div',[{key:'class',value:'d-flex align-items-center'}]);
        const img=cart.createElem('img',[{key:'class',value:"rounded-3 me-3 w25"},{key:'alt',value:'image'},{key:'src',value:cartItem.cartImage}]);
        div.appendChild(img);
        const info=cart.createCartItemInfo(cartItem);
        div.appendChild(info);
        const span=cart.createElem('span',[{key:'class',value:'text-black-50 small'}]);
           span.innerHTML=`${cartItem.qty}x`
        parentDiv.appendChild(div);
        parentDiv.appendChild(span);
        return parentDiv;
       }

       

}
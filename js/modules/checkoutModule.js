import { Validation } from "./validate.js";
import { General } from "./generalModule.js";
const validate=new Validation();
const general=new General();
export class Checkout{
      constructor(){
        this.name=document.querySelector('#name');
        this.email=document.querySelector('#email');
        this.phone=document.querySelector('#phone');
        this.address=document.querySelector('#address');
        this.code=document.querySelector('#code');
        this.city=document.querySelector('#city');
        this.country=document.querySelector('#country');
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
        this.errorArray=[ this.emailError, this.phoneError,this.codeError,this.pinError,this.eMoneyNumberError]
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

}
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
      }   

      inputsEventlistener(){
        self=this;
        this.email.addEventListener('keyup',function(e){
            const email=e.target.value;
           if(email !== ''){
            (validate.validateMail(email))? general.showValidInput(self.emailError,self.email):general.showInvalidInput(self.emailError,self.email);
           }else{general.showEmptyInput(self.emailError,self.email)}
        });
        this.email.addEventListener('blur',function(e){
        const email=e.target.value;
        if(email === ''){
           general.showEmptyInput(self.emailError,self.email,'blur')}
         });
         this.phone.addEventListener('keyup',function(e){
            const phone=e.target.value;
        if(phone !== ''){
            (validate.validatePhone(phone))? general.showValidInput(self.phoneError,self.phone):general.showInvalidInput(self.phoneError,self.phone);
        }else{general.showEmptyInput(self.phoneError,self.phone)}
         });
        this.phone.addEventListener('blur',function(e){
        const phone=e.target.value;
        if(phone === ''){
        general.showEmptyInput(self.phoneError,self.phone,'blur')}
        })
        this.code.addEventListener('keyup',function(e){
            const code=e.target.value;
        if(code !== ''){
            (validate.validateCode(code))? general.showValidInput(self.codeError,self.code):general.showInvalidInput(self.codeError,self.code);
        }else{general.showEmptyInput(self.codeError,self.code)}
         });
        this.code.addEventListener('blur',function(e){
        const code=e.target.value;
        if(code === ''){
        general.showEmptyInput(self.codeError,self.code,'blur')}
        })
        this.eMoneyPin.addEventListener('keyup',function(e){
            const pin=e.target.value;
        if(pin !== ''){
            (validate.validatePIN(pin))? general.showValidInput(self.pinError,self.eMoneyPin):general.showInvalidInput(self.pinError,self.eMoneyPin);
        }else{general.showEmptyInput(self.pinError,self.eMoneyPin)}
         });
        this.eMoneyPin.addEventListener('blur',function(e){
        const pin=e.target.value;
        if(pin === ''){
        general.showEmptyInput(self.pinError,self.eMoneyPin,'blur')}
        });
        this.eMoneyNumber.addEventListener('keyup',function(e){
            const num=e.target.value;
        if(num !== ''){
            (validate.validateEMoneyNumber(num))? general.showValidInput(self.eMoneyNumberError,self.eMoneyNumber):general.showInvalidInput(self.eMoneyNumberError,self.eMoneyNumber);
        }else{general.showEmptyInput(self.pinError,self.eMoneyPin)}
         });
        this.eMoneyNumber.addEventListener('blur',function(e){
        const num=e.target.value;
        if(num === ''){
        general.showEmptyInput(self.eMoneyNumberError,self.eMoneyNumber,'blur')}
        })

}
}
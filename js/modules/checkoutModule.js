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
        this.eMoneyNumber=document.querySelector('#e-Money Number');
        this.eMoneyPin=document.querySelector('#e-Money PIN');
        this.emailError=document.querySelector('#mailError');
        this.phoneError=document.querySelector('#phoneError');
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
}
}
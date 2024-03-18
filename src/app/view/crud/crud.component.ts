import { Component } from '@angular/core';
import { User } from './class/user';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import Modal from 'bootstrap/js/dist/modal.js'


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  // styleUrls: ['./crud.component.scss']
})
export class CrudComponent {

  //資料狀態
  users = [
        {id: 1, name:'Jani',country:'Norway', salary: 5, email: 'Guithay65@gustr.com'},
        {id: 2, name:'Carl',country:'Sweden', salary: 24, email: 'cluphetret@hotmail.com'},
        {id: 3, name:'Margareth',country:'England', salary: 5, email: 'phitrudreh@yahoo.com'},
        {id: 4, name:'Hege',country:'Norway', salary: 15, email: 'thapripich@gmail.com'},
        {id: 5, name:'Joe',country:'Denmark', salary: 20, email: 'qakyssaxisu-3687@yopmail.com'}
        ];
  tempData={
    id:0 ,
    name:'',
    country:'', 
    salary: 0, 
    email: ""
  }
  isFormOpen:boolean=false
  isAddUser:boolean=false
  total:number=0
  
  userForm = new FormGroup({
    id:new FormControl<number>(0),
    name:new FormControl<string>(''),
    country:new FormControl<string>(''),
    salary:new FormControl<number>(0),
    email:new FormControl<string>("")
  })
  
  //生命週期
  constructor(){}
  
  ngOnInit(): void {
    this.calcTotal()
  }

  ngDoCheck(): void {
    this.calcTotal()
  }

  //函式
  addUser(){
    const newUser = {
      id: this.users.length + 1, 
      name: this.userForm.get('name')?.value ?? '',
      country: this.userForm.get('country')?.value ?? '',
      salary: this.userForm.get('salary')?.value ?? 0,
      email: this.userForm.get('email')?.value ?? ''
    };
    
      this.users.push(newUser)
      this.isFormOpen = false
      this.isAddUser = false
      this.userForm.reset()
  }
  
  //待完成
  editUser(user:any){
    this.userForm.reset()
    console.log(user)
  }

  confirmEdit(){
    console.log(this.tempData)
  }

  deleteUser(id:number){
    this.users.filter((item,i) =>{
      if(id === item.id){
        this.users.splice(i,1)
      }
    })
  }

  calcTotal(){
    let num = 0
    this.users.forEach(item =>{
      num += item.salary
    })
    this.total = num
  }
  
}

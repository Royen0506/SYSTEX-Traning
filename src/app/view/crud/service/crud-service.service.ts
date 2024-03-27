import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CrudServiceService {
  //宣告變數為BehaviorSubject
  public originalUsersData = new BehaviorSubject<any[]>([]);
  public UsersData = new BehaviorSubject<any[]>([]);
  public totalSalary = new BehaviorSubject<number>(0);
  public originalUsers$ = this.originalUsersData.asObservable();

  public isFormOpen: boolean = false;
  public isAddUser: boolean = false;
  public searchValue: string = '';

  userForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    country: new FormControl<string>(''),
    salary: new FormControl<number>(0),
    email: new FormControl<string>(''),
  });

  //生命週期
  constructor() {
    //創建時賦值
    this.originalUsersData.next([
      {
        id: 1,
        name: 'Jani',
        country: 'Norway',
        salary: 5,
        email: 'Guithay65@gustr.com',
      },
      {
        id: 2,
        name: 'Carl',
        country: 'Sweden',
        salary: 24,
        email: 'cluphetret@hotmail.com',
      },
      {
        id: 3,
        name: 'Margareth',
        country: 'England',
        salary: 5,
        email: 'phitrudreh@yahoo.com',
      },
      {
        id: 4,
        name: 'Hege',
        country: 'Norway',
        salary: 15,
        email: 'thapripich@gmail.com',
      },
      {
        id: 5,
        name: 'Joe',
        country: 'Denmark',
        salary: 20,
        email: 'qakyssaxisu-3687@yopmail.com',
      },
    ]);
    
    this.UsersData.next([...this.originalUsersData.value])
    this.updateTotal();
  }

  // 函式/方法
  addUser(data: any) {
    data.id = this.UsersData.value.length+1
    console.log(data)
    if(!this.isAddUser){
      this.originalUsersData.value.push(data);
    }
    else{
      this.UsersData.value.push(data)
    }
    
    this.originalUsersData.next([...this.UsersData.value]);
    this.filterBySearch(this.searchValue);
    this.updateTotal();
  }

  editUser(user: any) {
    const updatedUsers = this.originalUsersData.value.map((item) => {
      if (item.id === user.id) {
        return user;
      } else {
        return item;
      }
    });

    const updatedUsersData = this.UsersData.value.map((item) => {
      const updatedUser = updatedUsers.find((u) => u.id === item.id);
        return updatedUser || item
      });
    this.UsersData.next([...updatedUsersData]);

    this.originalUsersData.next([...updatedUsers]);
    this.filterBySearch(this.searchValue)
    
  }

  deleteUser(id: number) {
    // 找到要刪除的索引
    const index = this.UsersData.value.findIndex((item) => item.id === id);
    // 從 UsersData 中刪除
    this.UsersData.value.splice(index, 1);
    // 更新 originalUsersData
    this.originalUsersData.next([...this.UsersData.value]);
    this.filterBySearch(this.searchValue)
    this.isFormOpen = false;
  
}

  calcTotal() {
    let num = 0;
    this.originalUsersData.value.forEach((item) => {
      num += item.salary;
    });
    return num;
  }

  updateTotal() {
    const total = this.calcTotal();
    this.totalSalary.next(total);
  }

  filterBySearch(txt: string) {
    this.searchValue = txt.trim().toLowerCase()
    if (txt.trim() === '') {
      this.originalUsersData.next(this.UsersData.value);
      return;
    }
    //用淺拷貝的userData篩選，並next回originalUsersData
    const matchData = this.UsersData.value.filter((item) => {
      return item.name.toLowerCase().includes(txt.trim().toLowerCase());
    });
    
    this.originalUsersData.next([...matchData]);
    
  }

  toggleFormOpen() {
    this.isFormOpen = true;
    this.userForm.reset();
  }

  toggleIsAddUser() {
    this.isAddUser = true;
  }

  toggleIsEditUser(item: any) {
    this.userForm.patchValue(item);
  }
}

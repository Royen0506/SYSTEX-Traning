import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudServiceService {
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
    
    //淺拷貝複製一份資料供搜尋用
    this.UsersData.next([...this.originalUsersData.value])
    this.updateTotal();
  }

  // 函式/方法
  addUser(data: any) {
    this.originalUsersData.value.push(data);
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
    this.originalUsersData.next(updatedUsers);
  }

  confirmEdit() {
    this.isFormOpen = false;
    this.isAddUser = false;
    this.userForm.reset();
  }

  deleteUser(id: number) {
    const updatedUsers = this.originalUsersData.value.filter(
      //當id不等於item.id會過濾掉
      (item) => item.id !== id
    );
    //用next發送刪除過後的資料回所有訂閱
    this.originalUsersData.next(updatedUsers);
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
    if (txt.trim() === '') {
      this.originalUsersData.next(this.UsersData.value);
      return;
    }
    //用淺拷貝的userData篩選，並next回originalUsersData
    const matchData = this.UsersData.value.filter((item) => {
    return item.name.toLowerCase().match(txt.trim().toLowerCase());
  });

    this.originalUsersData.next(matchData);
  }

  toggleFormOpen() {
    this.isFormOpen = true;
    this.userForm.reset();
  }

  toggleIsAddUser() {
    this.isAddUser = true;
  }

  toggleIsEditUser(item: any) {
    this.isAddUser = false;
    this.userForm.patchValue(item);
  }
}

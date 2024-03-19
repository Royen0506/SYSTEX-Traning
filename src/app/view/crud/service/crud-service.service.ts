import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudServiceService {
  originalUsers = [
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
  ];

  users = [...this.originalUsers]; //淺拷貝與原始資料隔離

  isFormOpen: boolean = false;
  isAddUser: boolean = false;
  total: number = 0;
  searchValue: string = '';

  userForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    country: new FormControl<string>(''),
    salary: new FormControl<number>(0),
    email: new FormControl<string>(''),
  });

  //生命週期

  ngOnInit(): void {
    this.calcTotal();
  }

  ngDoCheck(): void {
    this.calcTotal();
  }

  //函式/方法
  addUser() {
    const newUser = {
      id: this.users.length + 1,
      name: this.userForm.get('name')?.value ?? '',
      country: this.userForm.get('country')?.value ?? '',
      salary: this.userForm.get('salary')?.value ?? 0,
      email: this.userForm.get('email')?.value ?? '',
    };

    this.users.push(newUser);
    this.isFormOpen = false;
    this.isAddUser = false;
    this.userForm.reset();
  }

  editUser(user: any) {
    this.userForm.reset();
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      country: user.country,
      salary: user.salary,
      email: user.email,
    });
  }

  confirmEdit() {
    const newUser = {
      id: this.userForm.get('id')?.value ?? 0,
      name: this.userForm.get('name')?.value ?? '',
      country: this.userForm.get('country')?.value ?? '',
      salary: this.userForm.get('salary')?.value ?? 0,
      email: this.userForm.get('email')?.value ?? '',
    };

    this.users.forEach((item, i) => {
      if (item.id == newUser.id) {
        this.users.splice(i, 1, newUser);
      }
    });

    this.isFormOpen = false;
    this.isAddUser = false;
    this.userForm.reset();
  }

  deleteUser(id: number) {
    this.users.filter((item, i) => {
      if (id === item.id) {
        this.users.splice(i, 1);
      }
    });
  }

  calcTotal() {
    let num = 0;
    this.users.forEach((item) => {
      num += item.salary;
    });
    this.total = num;
  }

  filterBySearch() {
    if (this.searchValue === '') {
      this.users = [...this.originalUsers];
    } else {
      const filteredUsers = this.users.filter((item) => {
        return item.name.toLowerCase().includes(this.searchValue.toLowerCase());
      });
      this.users = filteredUsers;
    }
  }
}

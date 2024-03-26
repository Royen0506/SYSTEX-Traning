import { Component } from '@angular/core';
import { CrudServiceService } from '../../service/crud-service.service';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  // styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent {
  // 資料狀態
  users: any;
  total: number = 0;
  id: number = 0;
  searchValue: string = '';

  // 生命週期
  constructor(public dataService: CrudServiceService) {}

  ngOnInit(): void {
    this.dataInit();
  }

  // 函式/方法
  dataInit() {
    this.dataService.originalUsers$.subscribe((data) => {
      this.users = data;
      this.calculateTotal();
    });

    this.dataService.totalSalary.subscribe((total) => {
      this.total = total;
    });
  }

  calculateTotal() {
    this.total = this.dataService.calcTotal();
  }

  deleteUser(id: number) {
    this.dataService.userForm.reset()
    this.dataService.deleteUser(id);
  }

  filterBySearch() {
    this.dataService.userForm.reset()
    this.dataService.isFormOpen =false
    //強制將全型字改半型
    const strPreprocessing = (str:string) => {
      return str.replace(/[\uff01-\uff5e]/g, function (ch) {
        return String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
      }).replace(/\u3000/g, ' ')
    }
    this.dataService.filterBySearch(strPreprocessing(this.searchValue.toLocaleLowerCase()));
  }

  toggleForm() {
    this.dataService.toggleFormOpen();
  }

  toggleIsAddUser() {
    this.dataService.toggleIsAddUser();
  }

  toggleIsEditUser(item: any) {
    this.dataService.isAddUser = false
    this.dataService.toggleIsEditUser(item);
  }


}

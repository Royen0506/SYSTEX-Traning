import { Component } from '@angular/core';
import { CrudServiceService } from '../../service/crud-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  // styleUrls: ['./crud-form.component.scss']
})
export class CrudFormComponent {
  userForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    country: new FormControl<string>(''),
    salary: new FormControl<number>(0),
    email: new FormControl<string>(''),
  });

  constructor(public dataService: CrudServiceService) {}

  ngOnInit(): void {
    this.dataService.userForm.valueChanges.subscribe((formValue) => {
      this.userForm.patchValue(formValue);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.dataService.isAddUser) {
        const newId = this.dataService.originalUsersData.value.length + 1;
        this.userForm.patchValue({ id: newId });
        this.dataService.addUser(this.userForm.value);
      } else {
        this.dataService.editUser(this.userForm.value);
      }
      this.dataService.calcTotal();
      this.dataService.isFormOpen = false;
      this.userForm.reset();
    }
  }
}

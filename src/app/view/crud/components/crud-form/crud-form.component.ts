import { Component } from '@angular/core';
import { CrudServiceService } from '../../service/crud-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  // styleUrls: ['./crud-form.component.scss']
})
export class CrudFormComponent {
  public userForm = new FormGroup({
    id: new FormControl<number>(0,Validators.required),
    name: new FormControl<string>('',Validators.required),
    country: new FormControl<string>('',Validators.required),
    salary: new FormControl<number>(0,Validators.required),
    email: new FormControl<string>('',[Validators.email,Validators.required]),
  });

  constructor(public dataService: CrudServiceService) {}

  ngOnInit(): void {
    this.dataService.userForm.valueChanges.subscribe((formValue) => {
      this.userForm.patchValue(formValue);
    });
  }

  onSubmit() {
      if (this.dataService.isAddUser) {
        const newId = this.dataService.originalUsersData.value.length + 1;
        this.userForm.patchValue({ id: newId });
        this.dataService.addUser(this.userForm.value);
      } else {
        this.dataService.editUser(this.userForm.value)
      }
      this.dataService.calcTotal();
      this.dataService.isFormOpen = false;
      this.userForm.reset();
    }
  
}

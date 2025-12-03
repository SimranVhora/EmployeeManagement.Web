import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../Shared/Services/api.service';
import { Department } from '../../Shared/Models/department.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

function dateNotInFutureValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return null;
    const valDate = new Date(control.value);
    const today = new Date();
    // zero time portion
    today.setHours(0,0,0,0);
    if (valDate > today) return { futureDate: true };
    return null;
  };
}
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  departments: Department[] = [];
  submitting = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router
    //,private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      departmentID: [null, [Validators.required]],
      salary: [null, [Validators.required, Validators.min(0.01)]],
      dateOfJoining: ['', [Validators.required, dateNotInFutureValidator()]],
      isActive: [true, [Validators.required]]
    });
    console.log('AddEmployeeComponent initialized');
  }

  ngOnInit(): void {
    this.api.getDepartments().subscribe(d => this.departments = d);
  }

  // Typed accessor for template to allow dot-access (f.firstName) under strict template checking
  get f(): {
    firstName: AbstractControl;
    lastName: AbstractControl;
    email: AbstractControl;
    departmentID: AbstractControl;
    salary: AbstractControl;
    dateOfJoining: AbstractControl;
    isActive: AbstractControl;
  } {
    return this.form.controls as any;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.errorMsg = '';
    const payload = this.form.value;
    // ensure date format YYYY-MM-DD
    payload.dateOfJoining = new Date(payload.dateOfJoining).toISOString().slice(0,10);

    this.api.addEmployee(payload).subscribe({
      next: res => {
        this.submitting = false;
       //  this.toastr.success('Employee added successfully!', 'Success');
        // navigate back to list or show success
        this.router.navigate(['/employees']);
      },
      error: err => {
        this.submitting = false;

        this.errorMsg = err?.error?.message || err?.message || 'Failed to add employee';
        //this.toastr.error(this.errorMsg|| 'Something went wrong!', 'Error');
        console.error('Add employee error:', err);
      }
    });
  }
  goBack() {
  this.router.navigate(['/employees']);
}

resetForm() {
  this.form.reset({
    isActive: true,
    departmentID: null
  });
}

}

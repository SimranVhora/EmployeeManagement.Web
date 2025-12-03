import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../Shared/Models/employee.model';
import { Department } from '../../Shared/Models/department.model';
import { EmployeeFilter } from '../../Shared/Models/employee-filter-request.model';
import { ApiService } from '../../Shared/Services/api.service';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss'],
})
export class EmployeeList {
employees: Employee[] = [];
  departments: Department[] = [];
  total = 0;

  // filter state
  filter: EmployeeFilter = {
    page: 1,
    pageSize: 10,
    sortBy: 'firstName',
    sortOrder: 'asc'
  };

  searchText = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments() {
    this.api.getDepartments().subscribe(d => this.departments = d);
  }

  loadEmployees() {
    // create a copy
    const payload = { ...this.filter, searchText: this.searchText };
    this.api.getEmployees(payload).subscribe(res => {
      // API returns { data, total }. Some endpoints may return plain array.
      if ((res as any).data) {
        this.employees = (res as any).data;
        this.total = (res as any).total ?? this.employees.length;
      } else {
        this.employees = res as any;
        this.total = this.employees.length;
      }
    });
  }

  onDepartmentChange(deptId: number | null) {
    if (deptId !== null && deptId !== undefined) this.filter.departmentID = deptId;
    else this.filter.departmentID = null;
    this.filter.page = 1;
    this.loadEmployees();
  }
  onSearch() {
    this.filter.page = 1;
    this.loadEmployees();
  }

  changePage(page: number) {
    this.filter.page = page;
    this.loadEmployees();
  }

  changePageSize(size: number) {
    this.filter.pageSize = size;
    this.filter.page = 1;
    this.loadEmployees();
  }

  sortBy(column: string) {
    if (this.filter.sortBy === column) {
      this.filter.sortOrder = this.filter.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.filter.sortBy = column;
      this.filter.sortOrder = 'asc';
    }
    this.loadEmployees();
  }

  clearFilters() {
    this.filter = { page: 1, pageSize: 10, sortBy: 'firstName', sortOrder: 'asc' };
    this.searchText = '';
    this.loadEmployees();
  }

  // Helper used from the template to safely map departmentID -> name.
  // Keeping logic in the component avoids complex expressions in the template
  // which the Angular template parser/typechecker disallows.
  getDepartmentName(departmentID?: number): string | number {
    const dept = this.departments.find(d => d.departmentID === departmentID);
    return dept ? dept.departmentName : (departmentID ?? '');
  }
}

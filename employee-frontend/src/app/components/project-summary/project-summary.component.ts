import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Shared/Services/api.service';
import { EmployeeProjectSummary } from '../../Shared/Models/employee-project-summary.model';


@Component({
  selector: 'app-project-summary',
  imports: [],
  templateUrl: './project-summary.component.html',
  styleUrl: './project-summary.component.scss'
})
export class ProjectSummaryComponent {
summary: EmployeeProjectSummary[] = [];
  selectedEmployeeProjects: any[] | null = null;
  selectedEmployeeName = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEmployeeProjectSummary().subscribe(s => this.summary = s);
  }

  drill(employeeId: number, name: string) {
    this.selectedEmployeeName = name;
    this.api.getEmployeeProjects(employeeId).subscribe(p => this.selectedEmployeeProjects = p);
  }

  closeDrill() {
    this.selectedEmployeeProjects = null;
    this.selectedEmployeeName = '';
  }
}

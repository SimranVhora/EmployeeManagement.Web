import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../Shared/Services/api.service';
import { EmployeeProjectSummary } from '../../Shared/Models/employee-project-summary.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit {
summary: EmployeeProjectSummary[] = [];
  selectedEmployeeProjects: any[] | null = null;
  selectedEmployeeName = '';

  constructor(private api: ApiService, private router: Router) {
    console.log('ProjectSummaryComponent initialized');
  }

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
   backToEmployeeList() {
   this.router.navigate(['/employees']);
  }
}

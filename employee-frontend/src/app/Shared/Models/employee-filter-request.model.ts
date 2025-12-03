export interface EmployeeFilter {
  minSalary?: number;
  maxSalary?: number;
  startDate?: string; // yyyy-mm-dd
  endDate?: string;   // yyyy-mm-dd
  isActive?: boolean | null;
  searchText?: string; // name or email
  departmentID?: number | null;
  page?: number;
  pageSize?: number;
  sortBy?: string;     // e.g., 'firstName' or 'salary'
  sortOrder?: 'asc' | 'desc';
}

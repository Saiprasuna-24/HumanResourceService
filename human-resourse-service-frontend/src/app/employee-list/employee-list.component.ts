
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  public employees: Employee[] | undefined;
  public employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService, //Dependency Injection
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      employeeId: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      emailAddress: [''],
      role: [''],
      currentGradeId: ['']
    });
  }

  ngOnInit() {
    this.employeeService.getAllEmployee().subscribe((res: Employee[]) => {
      this.employees = res;
    });
    // Only for delete
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
  }

  getTotalProductsCount(): number {
    return this.employeeService.getAllEmployee.length;
  }

  //--------Only for delete-----------------------------------------
  deleteModal: any;
  employeeIdTodelete: number = 0;
  allEmployee: Employee[] = [];
  openDeleteModal(id: number) {
    this.employeeIdTodelete = id;
    this.deleteModal.show();
  }
  delete() {
    console.log(' Delete in progress');
    this.employeeService.delete(this.employeeIdTodelete).subscribe({
      next: (data) => {
        this.allEmployee = this.allEmployee.filter(
          (_) => _.employeeId != this.employeeIdTodelete
          
        );
        this.deleteModal.hide();
        // this.router.navigate(["/employees"]);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //--------Reactive forms-----------------------------------------
  // onSubmit() {
  //   const employee = this.employeeForm.value;
  //   this.employeeService.update(employee).subscribe((res) => {
  //     console.log('Employee updated successfully!');
  //     this.ngOnInit();
  //   });
  // }

  onSelect(employee: Employee): void {
    this.employeeForm.setValue({
      employeeId: employee.employeeId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      phoneNumber: employee.phoneNumber,
      emailAddress: employee.emailAddress,
      role: employee.role,
      currentGradeId: employee.currentGradeId
    });
  }
}

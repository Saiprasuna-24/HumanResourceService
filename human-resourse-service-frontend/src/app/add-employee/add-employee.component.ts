import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  private nextemployeeId = 100000;

  employee: Employee = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: 0,
    role: '',
    currentGradeId: 0,
    accessGranted: false
  };

  employeeForm = new FormGroup({
    employeeId: new FormControl(),
    firstName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    lastName: new FormControl('',[Validators.required,Validators.maxLength(20)]),
    emailAddress: new FormControl('',[Validators.required,this.cognizantEmailValidator]),
    phoneNumber: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{10}$')]),
    role: new FormControl('',Validators.required),
    currentGradeId: new FormControl('',Validators.required),
  });

  
  roles = ['HR', 'Employee', 'TravelDeskExe'];
  gradeIds = Array.from(Array(10), (_, i) => i + 1);

  constructor(private employeeService:EmployeeService, private router:Router) {}

  //constructor(private employeeService:EmployeeService, private router:Router, private employeeDataService: EmployeeDataService) {}

// onSubmit() {
//   if (this.employeeForm.valid) {
//     const formData = { ...this.employeeForm.value };
//     formData.employeeId = this.nextemployeeId;
//     this.nextemployeeId++;
//     this.employeeService.addEmployee(formData).subscribe({
//       next: (data) => {
//         // Emit the updated employee list to the shared service
//         this.employeeService.getAllEmployee().subscribe((employees: any) => {
//           this.employeeDataService.setEmployeeList(employees);
//         });
//         this.router.navigate(['/employees']);
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
//   }
// }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = { ...this.employeeForm.value };
      formData.employeeId = this.nextemployeeId;
      this.nextemployeeId++;
      this.employeeService.addEmployee(formData).subscribe({
        
        next: (data) => {
          
          this.router.navigate(['/employees']).then(() => {
            alert('Employee added successfully');
            // Fetch updated list of employees after navigating to the '/employees' route
            this.employeeService.getAllEmployee().subscribe((employees: any) => {
              this.employeeService.setAllEmployee(employees);
            });
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  cognizantEmailValidator(control: FormControl) {
    const email = control.value;
    if (email && email.indexOf('@cognizant.com') === -1) {
      return { invalidEmail: true };
    }
    return null;
  }


}

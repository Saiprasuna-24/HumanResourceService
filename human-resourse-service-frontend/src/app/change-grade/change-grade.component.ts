import { Component } from '@angular/core';
import { Employee } from '../employee';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-grade',
  templateUrl: './change-grade.component.html',
  styleUrls: ['./change-grade.component.css']
})
export class ChangeGradeComponent {
  employee: Employee = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    emailAddress: '',
    role: '',
    currentGradeId: 0,
    accessGranted: false
  };
  id!: number;
  gradeid!: string;

  constructor(private http: HttpClient, private employeeService:EmployeeService, private router:Router,private route: ActivatedRoute) { }

  
  ngOnInit(): void {
      
    this.route.paramMap.subscribe((param) => { //editt:101 = @Path Varaible
      var id = Number(param.get('id')); // Read the product id from route 
      this.getById(id);
      
     ;
    });

  }
  getById(employeeId: number) {
    this.employeeService.getById(employeeId).subscribe((data) => {
     console.log(data);
      this.employee = data;
    });
  }
  updateGrade() {
    this.employeeService.updateGrade(this.employee)
    .subscribe({
      next:(data) => {
        alert('Employee updated successfully');
        this.router.navigateByUrl('/employees');
      },
      error:(err) => {
        console.log(err);
      }
    })


  }

  

}

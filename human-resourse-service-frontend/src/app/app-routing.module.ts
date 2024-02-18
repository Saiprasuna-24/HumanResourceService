import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ChangeGradeComponent } from './change-grade/change-grade.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent},
  { path: 'New', component:  AddEmployeeComponent},
  { path: 'EditGrade/:id', component: ChangeGradeComponent},
 // {path:'', redirectTo:'employees',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  //{path:'',component:HomeComponent}
  {path:'',component:LoginComponent},
  {path:'Login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from './employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
 
  //-------------Using Rest API---------
  constructor(private http: HttpClient) { }
ngOnInit(){}
  
  public getAllEmployee(): Observable<Employee[]> {
 //return this.http.get<Employee[]>(`http://localhost:3000/posts`);

 return this.http.get<Employee[]>(`http://localhost:9098/api/employees`,{headers:this.headers});
  }
  setAllEmployee(employees: Employee[]): Observable<Employee[]> {
   // return this.http.put<Employee[]>(`http://localhost:3000/posts`, employees);
     return this.http.put<Employee[]>(`http://localhost:9098/api/employees`, employees,{headers:this.headers});
  }
  
   addEmployee(data:any)
    {
  //return this.http.post<any>(" http://localhost:3000/posts",data)

 return this.http.post<any>(" http://localhost:9098/api/employees",data,{headers:this.headers})
      .pipe(map((res:any)=>{
        console.log(res);
        return res;
      }));
    }
    //------------------Update-------
    getById(employeeId: number) {
    //  return this.http.get<Employee>(`http://localhost:3000/posts/${id}`);
   
     return this.http.get<Employee>(`http://localhost:9098/api/employees/${employeeId}`,{headers:this.headers});
     console.log('');
     }
      
  
     updateGrade(payload:Employee){
    //  return this.http.put(`http://localhost:3000/posts/${payload['id']}`,payload);
    
    return this.http.put(`http://localhost:9098/api/employees/${payload.employeeId}`, payload,{headers:this.headers});

   
     }
  
     delete(employeeId:number){
    // return this.http.delete<Employee>(`http://localhost:3000/posts/${id}`);
   
     return this.http.delete<Employee>(`http://localhost:9098/api/employees/${employeeId}`,{headers:this.headers});
   }
   
  
}
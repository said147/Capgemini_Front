import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../models/role";
import { TokenStorageService } from "./token-storage-service";



const AUTH_API = 'http://localhost:8082/api/auth/';

/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};*/

const httpOptions =
 { headers: new HttpHeaders().set('Authorization',`Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYWlkIiwiaWF0IjoxNjgyMjg4MzYyLCJleHAiOjE2ODIzNzQ3NjJ9.BH9brk0g1VxvmVf9DbFB77nvIQrPotuj5yStdom9D0a5OBvTfBFw6RVMP03wzjxkQgxljTI5bP58M7ToUHl46Q"}`)};



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:any;
  
    constructor(private http: HttpClient,private token: TokenStorageService) { 
      this.currentUser = this.token.getUser();
    console.log(this.currentUser.prenom)
    console.log(this.currentUser.roles)
    console.log(this.currentUser.accessToken)
    }

    
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string ,prenom:string,departement:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      prenom,
      departement
     
     
    }, httpOptions);
  }
  public isAdmin(): boolean {
    this.currentUser.roles.includes("Admin");
    return true;
  }
  

}

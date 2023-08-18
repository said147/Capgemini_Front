import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { AuthService } from 'src/app/_services/auth-service';

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {
  form: any = {
    username: null,
    prenom: null,
    email: null,
    password: null,
   
    departement: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private service: HelpdeskserviceService, private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
  }
  /*getAdminFormDat(data:any){
    console.log(data);
    this.service.saveDemand(data).subscribe((result)=>{
      console.warn(result);
    })
  }*/
  onSubmit(): void {
    const { username, email, password,prenom,departement } = this.form;

    this.authService.register(username, email, password,prenom,departement).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

import { AuthService } from 'src/app/_services/auth-service';
import { TokenStorageService } from 'src/app/_services/token-storage-service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  employe: any;
  avc:any;
  id_employer:any
  //
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private service: HelpdeskserviceService, private router: Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }
 /* getAdminFormDat(data:any){
    console.log(data);
  / this.router.navigate(['request-handover']);
   this.service.saveDemand(data).subscribe((result)=>{

      console.warn(result);
      
    })
    
  }*/
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    
  }

  reloadPage(): void {
    /*window.location.reload();*/
    this.router.navigateByUrl('/home');
  }
}

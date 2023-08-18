import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { UserService } from 'src/app/_services/user-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  a:any;
  b:any;
  c:any;
  d:any;
  e:any;
  f:any;
  g:any;
  r:any;
  private roles: string[] = [];
  response: number | undefined;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard=false;
  showQualiteBoard=false;
  constructor(private token: TokenStorageService,private service: HelpdeskserviceService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.showQualiteBoard = this.roles.includes('ROLE_QUALITE');
      
    }

    this.currentUser = this.token.getUser();
    console.log(this.currentUser.prenom)
    console.log(this.currentUser.roles)
    console.log(this.currentUser.token)
    

    
    this.service.CountChange(this.currentUser.id).subscribe(
      response => {
     this.f=response
       console.log( this.response)
      } );

      this.service.CountTelework(this.currentUser.id).subscribe(
        response => {
       this.g=response
         console.log( this.response)
        } );
        this.service. CountReturn(this.currentUser.id).subscribe(
          response => {
         this.r=response
           console.log( this.response)
          } );
       


     this.service.CountRequests().subscribe(
      response => {
     this.a=response
       console.log( this.response)
      } );

      this.service.Count(this.currentUser.id).subscribe(
        response => {
       this.e=response
         console.log( this.response)
        } );

      this.service.CountRequestClosed().subscribe(
        response => {
       this.b=response
         console.log( this.response)
        } );

        this.service.CountRequestWaiting().subscribe(
          response => {
         this.c=response
           console.log( this.response)
          } );

          this.service.CountRequestEnCours().subscribe(
            response => {
           this.d=response
             console.log( this.response)
            } );
  }

}

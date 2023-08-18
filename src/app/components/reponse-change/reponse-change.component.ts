import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-reponse-change',
  templateUrl: './reponse-change.component.html',
  styleUrls: ['./reponse-change.component.css']
})
export class ReponseChangeComponent implements OnInit {
  status:string="";
  p:number=1;
  itemPerPage:number=5;
  demandes:any;
  id?: any;
  isLoggedIn = false;
  username?: string;
   
    prenom?: any;
    departement?: any;
  constructor(private service: HelpdeskserviceService,private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    

      

      this.username = user.username;
      this.id=user.id;
      this.prenom=user.prenom;
      this.departement=user.departement;
      
      
    }
    this.service.repDemandeChange(this.id).subscribe(
      response => {
        this.demandes= response;
       console.log( this.demandes)
      
     
      
      
      
      
      }
      
      );
  }
  cancal(){
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
    this.router.navigateByUrl('/reponse-handover');
  }
}

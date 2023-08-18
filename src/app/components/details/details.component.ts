import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { Email } from 'src/app/models/email';
import { Materiel } from 'src/app/models/materiel';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  demandes:any;
  User:any;
  c:any;
  Materiel:any;
  id:any
  username:any;
  providerToUpdate:any;
  data:Email=new Email;
  currentUser: any;
  private roles: string[] = [];
 
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard=false;
  showQualiteBoard=false;
  showSupeBoard=false;
  showAchatBoard=false;
  showFinanceBoard=false;
  constructor(private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.showQualiteBoard = this.roles.includes('ROLE_QUALITE');
      this.showSupeBoard = this.roles.includes('ROLE_N');
      this.showAchatBoard = this.roles.includes('ROLE_ACHAT');
      this.showFinanceBoard = this.roles.includes('ROLE_FIANANCE');
      this.username = user.username;
    }
    this.route.paramMap.subscribe(
      params => {
      this.id = params.get('id_tiquete'); 
      console.log("cc")
      console.log( this.id);
   
      }
      );
      
      
      this.service.getTiquete(this.id).subscribe(
        response => {
        this.demandes= response;
         console.log(this.demandes);
         
        }
        );
      
       /* this.service. listmat(this.id).subscribe(
          response => {
          this.demandes= response;
          
          }
          );*/
          /**this.service.getMateriel(this.id).subscribe(
            response => {
            this.Materiel= response;
             
             console.log(this.Materiel);
            }
            );*/
  }
  

  updateProvider() {
 
    this.providerToUpdate = {
    status: 'confirmed'
    
    }
  
    console.log(this.providerToUpdate)
    console.log("1");
   this.service.updateProvider(this.id, this.providerToUpdate).subscribe(
    response => {
    
    console.log(response);
    
    }
    );
    
    this.service.getProvider(this.id).subscribe(
      response => {
      this.demandes= response;
       /*console.log(this.demandes);*/
       
      }
      );
    this.data.destinaire=this.demandes.user.email;
    this.data.massage="Hi"+" "+this.demandes.user.username+","+" "+"Your request"+" " +"IT Asset Handover"+" "+" is in process";
    this.data.objet="Alerts";
    console.log(this.data)
    this.service.Sendemail(this.data).subscribe(
      response => {
     
    
  
      console.log("ok");
     }
     
     );
 
}
updatestatus() {
 
  this.providerToUpdate = {
  status: 'Canceled'
  
  }

  console.log(this.providerToUpdate)
  console.log("1");
 this.service.updateStatus(this.id, this.providerToUpdate).subscribe(
  response => {
  
  console.log(response);
  
  }
  );
  
  this.data.destinaire=this.demandes.user.email;
    this.data.massage="Hi"+" "+this.demandes.user.username+","+" "+"Your request"+" " +"IT Asset Handover"+" "+" is closed";
    this.data.objet="Alerts";
    console.log(this.data)
    this.service.Sendemail(this.data).subscribe(
      response => {
     
    
  
      console.log("ok");
     }
     
     );

}




send(){
  this.service.getProvider(this.id).subscribe(
    response => {
    this.demandes= response;
     /*console.log(this.demandes);*/
     
    }
    );
  this.data.destinaire=this.demandes.user.email;
  this.data.massage="Hi"+" "+this.demandes.user.username+","+" "+"Your request"+" " +"IT Asset Handover"+" "+" is in process";
  this.data.objet="Alerts";
  console.log(this.data)
  this.service.Sendemail(this.data).subscribe(
    response => {
   
  

    console.log("ok");
   }
   
   );
} 
OnNavigue(){
  if(this.demandes.type_Request=="Asset Handover Form"){
    this.router.navigateByUrl('/request-handover/'+this.id);
  }
  else if(this.demandes.type_Request=="ASSET CHANGE FORM"){
    this.router.navigateByUrl('/request-change/'+this.id);
  }


  else{
    this.router.navigateByUrl('/request-voucher/'+this.id);
  }
 
}
onVa(){
  if(this.demandes.type_Request=="Asset Handover Form"){
    this.router.navigateByUrl('/view/'+this.id);
    console.log("1")
  }
  else if(this.demandes.type_Request=="ASSET CHANGE FORM"){
    this.router.navigateByUrl('/view-change/'+this.id);
    console.log("2")
  }
  else if(this.demandes.type_Request=="IT Asset return voucher"){
    this.router.navigateByUrl('/view-return/'+this.id);
    console.log("2")
  }
  
}
}

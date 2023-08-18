import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-details-return',
  templateUrl: './details-return.component.html',
  styleUrls: ['./details-return.component.css']
})
export class DetailsReturnComponent implements OnInit {
  id:any;
  demandes:any;
  dfd:any[]=[];
  d:any;
  providerToUpdate:any;
  data:Email=new Email;
  name_verified:any;
  isLoggedIn = false;
  username?: string;
  prenom?: string;
  constructor(private tokenStorageService: TokenStorageService,private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    

      

      this.username = user.username;
      this.prenom=user.prenom
      
      
      
    }
    this.route.paramMap.subscribe(
      params => {
      this.id = params.get('id_demandeRetour'); 
      console.log("cc")
      console.log( this.id);
   
      }
      );
      
      
      this.service.getDemandeRetourVoucher(this.id).subscribe(
        response => {
        this.demandes= response;
         console.log(this.demandes);
         
        }
        );
       /* this.service.getMaterielRetourVoucher(this.id).subscribe(
          response => {
          this.Materiel= response;
           
           console.log(this.Materiel);
          }
          );*/
       /* this.service. listmat(this.id).subscribe(
          response => {
          this.demandes= response;
          
          }
          );*/
       
  }
  updateProvider() {
 
    this.providerToUpdate = {
    name_verified: "ahmed"
    }
  
    console.log(this.providerToUpdate)
    console.log("1");
   this.service.updateRetour(this.id, this.providerToUpdate).subscribe(
    response => {
    
    console.log(response);
    
    }
    );
    
    /*this.data.destinaire=this.demandes.user.email;
    this.data.massage="Hi"+" "+this.demandes.user.username+","+" "+"Your request"+"  " + this.demandes.type_Demande+" "+" is in process";
    this.data.objet="Alerts";
    console.log(this.data)
    this.service.Sendemail(this.data).subscribe(
      response => {
     
    
  
      console.log("ok");
     }
     
     );*/
 
}
updatestatus() {
 
  this.providerToUpdate = {
  status: 'Canceled'
  
  }

  console.log(this.providerToUpdate)
  console.log("1");
 this.service.updateRetourStatus(this.id, this.providerToUpdate).subscribe(
  response => {
  
  console.log(response);
  
  }
  );
  this.data.destinaire=this.demandes.user.email;
    this.data.massage="Hi"+" "+this.demandes.user.username+","+" "+"Your request"+" " + this.demandes.type_Demande+" "+" is closed";
    this.data.objet="Alerts";
    console.log(this.data)
    this.service.Sendemail(this.data).subscribe(
      response => {
     
    
  
      console.log("ok");
     }
     
     );
}
}

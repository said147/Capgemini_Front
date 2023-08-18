import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-details-change',
  templateUrl: './details-change.component.html',
  styleUrls: ['./details-change.component.css']
})
export class DetailsChangeComponent implements OnInit {
  id:any;
  demandes:any;
  providerToUpdate:any;
  data:Email=new Email;
  constructor(private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
      this.id = params.get('id_demandeChange'); 
      console.log("cc")
      console.log( this.id);
   
      }
      );
      this.service.getDemandeChange(this.id).subscribe(
        response => {
        this.demandes= response;
         console.log(this.demandes);
         
        }
        );
   
  }
  updateProvider() {
 
    this.providerToUpdate = {
    status: 'confirmed'
    
    }
  
    console.log(this.providerToUpdate)
    console.log("1");
   this.service.updateChange(this.id, this.providerToUpdate).subscribe(
    response => {
    
    console.log(response);
    
    }
    );
    this.data.destinaire=this.demandes.user.email;
    this.data.massage="Hi"+" "+this.demandes.user.username+","+" "+"Your request"+"  " + this.demandes.type_Demande+" "+" is in process";
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
 this.service.updateChangeStatus(this.id, this.providerToUpdate).subscribe(
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

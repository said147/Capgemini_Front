import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-details-telework',
  templateUrl: './details-telework.component.html',
  styleUrls: ['./details-telework.component.css']
})
export class DetailsTeleworkComponent implements OnInit {
  id:any;
  demandes:any;
  currentUser: any;
  private roles: string[] = [];
  providerToUpdate:any;
  data:Email=new Email;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard=false;
  showQualiteBoard=false;
  showSupeBoard=false;
  showAchatBoard=false;
  showFinanceBoard=false;
  username?: string;
  signatureImg: string | undefined;
  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;
  
  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 150
    

  };
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
      this.id = params.get('id_demandeTelework'); 
      console.log("cc")
      console.log( this.id);
   
      }
      );
      this.service.getDemandeTelework(this.id).subscribe(
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
   this.service.updateTelework(this.id, this.providerToUpdate).subscribe(
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
 this.service.updateTeleworkStatus(this.id, this.providerToUpdate).subscribe(
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
drawComplete() {
  console.log(this.signaturePad.toDataURL());
}

drawStart() {
  console.log('begin drawing');
}

clearSignature() {
  this.signaturePad.clear();
}

savePad() {
  const base64Data = this.signaturePad.toDataURL();
  this.signatureImg = base64Data;
}
}

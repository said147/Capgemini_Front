import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-details-depart',
  templateUrl: './details-depart.component.html',
  styleUrls: ['./details-depart.component.css']
})
export class DetailsDepartComponent implements OnInit {
  id:any;
  demandes:any;
  private roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard=false;
  isLoggedIn = false;
  username?: string;
  
  constructor(private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute,private token: TokenStorageService,private builder: FormBuilder) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
    this.route.paramMap.subscribe(
      params => {
      this.id = params.get('id_demandeDepart'); 
      console.log("cc")
      console.log( this.id);
   
      }
      );
      this.service.getDemandeDepart(this.id).subscribe(
        response => {
        this.demandes= response;
         console.log(this.demandes);
         
        }
        );
     
      
  }
  productform = this.builder.group({
    
    date_Entree:'',
    date_Depart: '',
    comment_RHi: this.builder.control('', Validators.required),
    comment_IT: this.builder.control('', Validators.required),
    comment_RH:this.builder.control('', Validators.required),
    comment_FINANCES:this.builder.control('', Validators.required),
    comment_AMG:this.builder.control('', Validators.required),
    status: '',
    type_Demande: '',
    tel_perso:'',
    dataURL:'',
   /* theme_RHi: true,*/
    theme_IT: true,
    /*theme_FINANCES: true,
    theme_RH: true,
    theme_AMG: true,*/
    resp_hier: '',
    activite: '',
    email_perso:'',
    matricule: '',
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
  
  });
  testEditorContent(){
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      const user = this.token.getUser();
      /* this.productform.value.type_Request=this.demandes.type_Request;
       this.productform.value.date=this.demandes.date;*/
      console.log(this.productform.value)
      
     this.service.updateTiquetes(this.id, this.productform.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );
    }
  }
  addDemandeDepart(){
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      const user = this.token.getUser();
       this.productform.value.date_Entree=this.demandes.date_Entree;
       this.productform.value.date_Depart=this.demandes.date_Depart;

       this.productform.value.type_Demande=this.demandes.type_Demande;
       this.productform.value.tel_perso=this.demandes.tel_perso;

       this.productform.value.dataURL=this.demandes.dataURL;
       this.productform.value.date_Depart=this.demandes.date_Depart;

       this.productform.value.resp_hier=this.demandes.resp_hier;
       this.productform.value.activite=this.demandes.activite;

       this.productform.value.email_perso=this.demandes.email_perso;
       this.productform.value.matricule=this.demandes.matricule;
      console.log(this.productform.value)
      
   this.service.updateDemandeDepart(this.id, this.productform.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );
    }
  }

}

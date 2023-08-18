import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-edit-depart',
  templateUrl: './edit-depart.component.html',
  styleUrls: ['./edit-depart.component.css']
})
export class EditDepartComponent implements OnInit {

  isLoggedIn = false;
  username?: string;
  id?: any;
  prenom?: any;
  departement?: any;
  signatureImg: string | undefined;
  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;
  demandes:any;
  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 150
    

  };
  constructor(private builder: FormBuilder,private tokenStorageService: TokenStorageService,private service: HelpdeskserviceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
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
      console.log( this.demandes);

    });
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      
      this.prenom=user.prenom;
      this.departement=user.departement; 
    }
  }
  productform = this.builder.group({

  
    date_Entree:this.builder.control('', Validators.required),
  date_Depart: this.builder.control('', Validators.required),
  comment_RHi: this.builder.control('', Validators.required),
  comment_IT: this.builder.control('', Validators.required),
  comment_RH:this.builder.control('', Validators.required),
  comment_FINANCES:this.builder.control('', Validators.required),
  comment_AMG: this.builder.control('', Validators.required),
  status: this.builder.control('', Validators.required),
  type_Demande: this.builder.control('', Validators.required),
  tel_perso:this.builder.control('', Validators.required),
  dataURL:'',
 /* theme_RHi: true,
  theme_IT: true,
  theme_FINANCES: true,
  theme_RH: true,
  theme_AMG: true,*/
  resp_hier: this.builder.control('', Validators.required),
  activite: this.builder.control('', Validators.required),
  email_perso:this.builder.control('', Validators.required),
  matricule: this.builder.control('', Validators.required),
  
    /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
    
  });
  addDemandeDepart(){
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
     this.productform.value.dataURL=this.signaturePad.toDataURL();
    console.log(this.productform.value);
    
   this.service.updateDemandeDepart(this.id,this.productform.value).subscribe((result)=>{
    console.warn(result);
  })
  }





  }
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
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

import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm ,FormArray, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

import { Materiel } from 'src/app/models/materiel';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { Demande } from 'src/app/models/demande';
import { formatDate } from '@angular/common';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-request-handover',
  templateUrl: './request-handover.component.html',
  styleUrls: ['./request-handover.component.css']
})
export class RequestHandoverComponent implements OnInit {
    demandes:any;
   demandesf =new Demande;
  /*materiel: any=Materiel;*/
   demande: Demande[]=[];
    employe:any;
    dynamicArray :any;
  dng:any={materiel:[]}
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;
    id?: any;
    prenom?: any;
    departement?: any;
    bookForm: any
    fooForm : FormGroup | undefined
    foo : any
    resData: any
    isData : boolean = false;
    dataform:any;
    
    @Input() equ: any[];
    providerToUpdate:any;
    signatureImg: string | undefined;
    @ViewChild(SignaturePad)
    signaturePad!: SignaturePad;
    
    signaturePadOptions: Object = { 
      'minWidth': 2,
      'canvasWidth': 300,
      'canvasHeight': 150
      
  
    };

   
 
  constructor(private builder: FormBuilder,private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute,private tokenStorageService: TokenStorageService) 
  { 
   this.equ=['C.U','Scrrean'];
  }

  ngOnInit(): void {
   
      this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.id=user.id;
      this.prenom=user.prenom;
      this.departement=user.departement; 
    }
   /* console.log(this.demande) */
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
  }


  formvariant !: FormArray<any>;
 
  productform = this.builder.group({
    date: this.builder.control('', Validators.required),
    allocation_motive: this.builder.control('', Validators.required),
    tiquete_id:this.id,
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
    materiel: this.builder.array([])
  });
  addDemande(){
    /*this.route.paramMap.subscribe(
      params => {
      this.id = params.get('id_tiquete'); 
      console.log("cc")
      console.log( this.id);
   
      }
      );*/
    /*  this.service.getTiquete(this.id).subscribe(
        response => {
        this.demandes= response;
         console.log(this.demandes);
         
        }
        );*/
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.demandes.user;
      const tiquete=this.demandes;
      this.productform.value.tiquete_id=this.id;

      
    console.log(this.productform.value);
    
   this.service.saveDemande(this.productform.value).subscribe((result)=>{
    console.warn(result);
  })
  this.providerToUpdate = {
    status: 'confirmed'
    
    }
  
    console.log(this.providerToUpdate)
    console.log("1");
   this.service.updateTiquete(this.id, this.providerToUpdate).subscribe(
    response => {
    
    console.log(response);
    
    }
    );
  }



  this.router.navigate(['/requests/details/',this.id]);
 

  }
  


  addRow() {
    this.formvariant = this.productform.get("materiel") as FormArray;
    this.formvariant.push(this.Generaterow());
    /*this.demandesf.materiel.push( this.materiels);*/
    console.log('New row added successfully', 'New Row');
  }
  Generaterow() {
    return this.builder.group({
    /*  id: this.builder.control({ value: 0, disabled: true }),
      productCode: this.builder.control(this.productform.value.code),
      price: this.builder.control(this.productform.value.price),
      isactive: this.builder.control(true),*/
      equipement: this.builder.control(''),
      model: this.builder.control(''),
      serial: this.builder.control(''),
      comment: this.builder.control('')
    });
  }

  get materiels() {
    return this.productform.get("materiel") as FormArray;
  }

  getAdminFormData(data:any){
   
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
     
    /*data.materiel=[]*/
     /*data.materiel=[{equipement:"c.u", "model": "assus",
     "serial": "1475",
     "comment": "ok"},{"equipement": "C.U",
     "model": "hpp",
     "serial": "422",
     "comment": "ok"}];*/
     
       /*console.warn(JSON.stringify(data));*/
      /* console.warn([data.materiel].concat(data));*/
     
     /* console.warn(data);
      
   
   this.service.saveDemande(data).subscribe((result)=>{
         console.warn(result);
       })*/
    }
   
   /* this.service.saveMateriel(data).subscribe((result)=>{
    
      console.warn(result);
    })*/
    
  //}
  /*getAdminFormDat(data:any){
    const user = this.tokenStorageService.getUser();
    data.id=user.id;
    console.warn(data);*/
   /* this.service.saveMateriel(data).subscribe((result)=>{
      console.warn(result);
    })*/
 }

 /*public isUser(){
  if(this.tokenStorageService.)
 }*/
 updateProvider() {
 
  this.providerToUpdate = {
  status: 'confirmed'
  
  }

  console.log(this.providerToUpdate)
  console.log("1");
 this.service.updateTiquete(this.id, this.providerToUpdate).subscribe(
  response => {
  
  console.log(response);
  
  }
  );
  
  
   
   

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



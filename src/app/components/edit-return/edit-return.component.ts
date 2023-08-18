import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-edit-return',
  templateUrl: './edit-return.component.html',
  styleUrls: ['./edit-return.component.css']
})
export class EditReturnComponent implements OnInit {
  id:any;
  demandes:any;
  providerToUpdate:any
  isLoggedIn = false;
  tiquetes:any;
  signatureImg: string | undefined;
  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;
  
  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 150
    

  };
  constructor(private builder: FormBuilder,private tokenStorageService: TokenStorageService,private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
      this.id = params.get('id_tiquete'); 
      console.log("cc")
      console.log( this.id);
      });
      
      this.service.getTiquete(this.id).subscribe(
        response => {
        this.tiquetes= response;
         console.log(this.tiquetes);
         
        }
        );
      this.service.getDemandeRetourVoucher(this.id).subscribe(
        response => {
        this.demandes= response;

      console.log( this.demandes);
    /*  this.service.getMateriel(this.id).subscribe(
        response => {
        this.Materiel= response;
         
         console.log(this.Materiel);
        }
        );*/

      if (this.demandes.variants != null) {
        for (let i = 0; i < this.demandes.materiel.length; i++) {
          this.addRow();
        }
        }


         this.productform.patchValue({
          date_retour: this.demandes.date_retour,
          name_verified: this.demandes.name_verified,
          reason: this.demandes.reason,
          materielRetour: this.demandes.materielRetour

         })
      });
  }
  formvariant !: FormArray<any>;
  productform = this.builder.group({
    date_retour: this.builder.control('', Validators.required),
    name_verified: this.builder.control('', Validators.required),
    reason: this.builder.control('', Validators.required),
   
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
    materielRetour: this.builder.array([])
  });
  updateDemandeReturn(){
   
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
   
      
      
    /* this.service.updateProviders(this.id, this.productform.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );*/
    }
  }
  addRow() {
    this.formvariant = this.productform.get("materielRetour") as FormArray;
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
      level: this.builder.control(''),
      comment: this.builder.control('')
    });
  }

  get materiels() {
    return this.productform.get("materielRetour") as FormArray;
  }
  /*updateProvider(){
   
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
   
      
      
     this.service.updateDemandeChange(this.id, this.productform.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );  
    }
  }*/
  productformas = this.builder.group({
    date_retour: '',
    name_verified: '',
    reason: '',
    dataURLChecker: '',
    dataURLEmploye:'',
   
    materielRetour:  this.builder.array([]),
    tiquete_id:'',
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
   
  });
  updatestatus() {
   
    this.providerToUpdate = {
    status: 'Canceled'
    
    }
  
    console.log(this.providerToUpdate)
    console.log("1");
   this.service.updateStatusTiquete(this.id, this.providerToUpdate).subscribe(
    response => {
    
    console.log(response);
    
    }
    );
    this.productformas.value.dataURLEmploye=this.signaturePad.toDataURL();
    this.productformas.value.date_retour=this.demandes[0].date_retour;
    this.productformas.value.reason=this.demandes[0].reason;
    this.productformas.value.name_verified=this.demandes[0].name_verified;
    this.productformas.value.dataURLChecker=this.demandes[0].dataURLChecker;
    this.productformas.value.materielRetour=this.demandes[0].materiel;
    this.productformas.value.tiquete_id=this.demandes[0].tiquete_id;
    this.service.updateDemandeRetour(this.demandes[0].id_demandeRetour, this.productformas.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );
    
  }
  productforma = this.builder.group({
    destinaire: '',
    massage: this.builder.control('', Validators.required),
    objet:''
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
   
  });
  updateProvider(){
   
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
   
      
      
    /* this.service.updateProviders(this.id, this.productform.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );*/
      this.productforma.value.destinaire=user.email;
      this.productforma.value.objet="Alerts";
    
    console.log( this.productforma.value)
   this.service.Sendemail(this.productforma.value).subscribe(
      response => {
     
    
  
      console.log("ok");
     }
     
     );
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

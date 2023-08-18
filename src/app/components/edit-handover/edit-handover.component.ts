import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { Email } from 'src/app/models/email';

@Component({
  selector: 'app-edit-handover',
  templateUrl: './edit-handover.component.html',
  styleUrls: ['./edit-handover.component.css']
})
export class EditHandoverComponent implements OnInit {
  id:any;
  demandes:any;
  providerToUpdate:any
  isLoggedIn = false;
  Materiel:any;
  tiquetes:any;
  datas:Email=new Email;
  userForm:any;
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
   
      }
      );

      
      
      this.service.getProvider(this.id).subscribe(
        response => {
        this.demandes= response;
      console.log( this.demandes);

      this.service.getTiquete(this.id).subscribe(
        response => {
        this.tiquetes= response;
         console.log(this.tiquetes);
         
        }
        );
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
           date: this.demandes.date,
           allocation_motive: this.demandes.allocation_motive,
           materiel: this.demandes.materiel

         })
        
      });
      this.productformas.patchValue({
        materiel: this.demandes.materiel,
       })
    
  }

  formvariant !: FormArray<any>;
  productform = this.builder.group({
    date: this.builder.control('', Validators.required),
    allocation_motive: this.builder.control('', Validators.required),
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
   
    materiel: this.builder.array([])
  });
 

  productforma = this.builder.group({
    destinaire: '',
    massage: this.builder.control('', Validators.required),
    objet:''
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
   
  });
  productformas = this.builder.group({
    date: '',
    dataURLEmploye:'',
    allocation_motive:'',
    materiel:  this.builder.array([]),
    tiquete_id:'',
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
   
  });
 
  addDemande(){
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
   
    console.log(this.productform.value);
    
   this.service.saveDemande(this.productform.value).subscribe((result)=>{
    console.warn(result);
  })
  }





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
      comment: this.builder.control(''),
      
    });
  }

  get materiels() {
    return this.productform.get("materiel") as FormArray;
  }



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
  updatestatus() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
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
    this.productformas.value.date=this.demandes[0].date;
    this.productformas.value.allocation_motive=this.demandes[0].allocation_motive;
    this.productformas.value.materiel=this.demandes[0].materiel;
    this.productformas.value.tiquete_id=this.demandes[0].tiquete_id;

    /*this.productformas.value.materiel=this.demandes.materiel;*/
    console.log(this.productformas.value);
      this.service.updateProviders(this.demandes[0].id_demande, this.productformas.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );
    }
    this.router.navigate(['/reponse-handover/details-user/',this.id]);
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

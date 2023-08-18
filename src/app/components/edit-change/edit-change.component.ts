import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-edit-change',
  templateUrl: './edit-change.component.html',
  styleUrls: ['./edit-change.component.css']
})
export class EditChangeComponent implements OnInit {
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
  constructor(private builder: FormBuilder,private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
      this.id = params.get('id_tiquete'); 
      console.log("cc")
      console.log( this.id);
      this.service.getDemandeChange(this.id).subscribe(
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
        for (let i = 0; i < this.demandes.materielChangeAncient.length; i++) {
          this.addRow1();
        }
        }
        if (this.demandes.variants != null) {
          for (let i = 0; i < this.demandes.materielChangeNew.length; i++) {
            this.addRow2();
          }
          }


         this.productform.patchValue({
           date: this.demandes.date,
           
           materielChangeNew: this.demandes.materielChangeNew,
           materielChangeAncient: this.demandes.materielChangeAncient

         })
      });
      }
      );
  }
  formvariant !: FormArray<any>;
productform = this.builder.group({
  date: this.builder.control('', Validators.required),
 
 /*  price: this.builder.control('', Validators.required),
  remarks: this.builder.control(''),
  category: this.builder.control(''),*/
  materielChangeAncient: this.builder.array([]),
  materielChangeNew: this.builder.array([]),
});
addDemandeChange(){
  if (this.tokenStorageService.getToken()) {
    this.isLoggedIn = true;
    const user = this.tokenStorageService.getUser();
 
  console.log(this.productform.value);
  
 this.service.saveDemandeChange(this.productform.value).subscribe((result)=>{
  console.warn(result);
})

}






}

addRow1() {
  this.formvariant = this.productform.get("materielChangeAncient") as FormArray;
  this.formvariant.push(this.Generaterow1());
  /*this.demandesf.materiel.push( this.materiels);*/
  console.log('New row added successfully', 'New Row');





}
addRow2() {
  this.formvariant = this.productform.get("materielChangeNew") as FormArray;
  this.formvariant.push(this.Generaterow2());
  /*this.demandesf.materiel.push( this.materiels);*/
  console.log('New row added successfully', 'New Row');

}
Generaterow1() {
  return this.builder.group({
  /*  id: this.builder.control({ value: 0, disabled: true }),
    productCode: this.builder.control(this.productform.value.code),
    price: this.builder.control(this.productform.value.price),
    isactive: this.builder.control(true),*/
    equipement: this.builder.control(''),
    model: this.builder.control(''),
    serial: this.builder.control(''),
    level: this.builder.control('')
  });
}
Generaterow2() {
  return this.builder.group({
  /*  id: this.builder.control({ value: 0, disabled: true }),
    productCode: this.builder.control(this.productform.value.code),
    price: this.builder.control(this.productform.value.price),
    isactive: this.builder.control(true),*/
    equipement: this.builder.control(''),
    model: this.builder.control(''),
    serial: this.builder.control(''),
    level: this.builder.control('')
  });
}
get materiels1() {
  return this.productform.get("materielChangeAncient") as FormArray;
}
get materiels2() {
  return this.productform.get("materielChangeNew") as FormArray;
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
productformas = this.builder.group({
  date: '',
  dataURLEmploye:'',
 
  tiquete_id:'',
  /*  price: this.builder.control('', Validators.required),
   remarks: this.builder.control(''),
   category: this.builder.control(''),*/
   materielChangeAncient: this.builder.array([]),
   materielChangeNew: this.builder.array([]),
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
  this.productformas.value.date=this.demandes[0].date;
  
  this.productformas.value.materielChangeAncient=this.demandes[0].materielChangeAncient;
  this.productformas.value.materielChangeNew=this.demandes[0].materielChangeNew;
  this.productformas.value.tiquete_id=this.demandes[0].tiquete_id;

  /*this.productformas.value.materiel=this.demandes.materiel;*/
  console.log(this.productformas.value);
  this.service.updateDemandeChange(this.demandes[0].id_demandeChange, this.productformas.value).subscribe(
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

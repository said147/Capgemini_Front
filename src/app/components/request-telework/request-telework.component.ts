import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-request-telework',
  templateUrl: './request-telework.component.html',
  styleUrls: ['./request-telework.component.css']
})
export class RequestTeleworkComponent implements OnInit {
  username?: string;
  id?: any;
  prenom?: any;
  departement?: any;
  isLoggedIn = false;
  signatureImg: string | undefined;
  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;
  
  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 150
    

  };
  constructor(private builder: FormBuilder,private service: HelpdeskserviceService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.id=user.id;
      this.prenom=user.prenom;
      this.departement=user.departement; 
    }
    const name = new Date();
    console.log(name)
  }
  formvariant !: FormArray<any>;
  productform = this.builder.group({
    date: this.builder.control('', Validators.required),
    adresse: this.builder.control('', Validators.required),
    dataURLEmploye:'',
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
    materielTelework: this.builder.array([])
  });
  addDemandeTelework(){
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      this.productform.value.dataURLEmploye=this.signaturePad.toDataURL();
    console.log(this.productform.value);
    
   this.service.saveDemandeTelework(this.productform.value).subscribe((result)=>{
    console.warn(result);
  })
  }





  }
  


  addRow() {
    this.formvariant = this.productform.get("materielTelework") as FormArray;
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
      
    });
  }

  get materiels() {
    return this.productform.get("materielTelework") as FormArray;
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

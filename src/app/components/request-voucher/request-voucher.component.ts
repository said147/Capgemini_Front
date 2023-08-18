import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-request-voucher',
  templateUrl: './request-voucher.component.html',
  styleUrls: ['./request-voucher.component.css']
})
export class RequestVoucherComponent implements OnInit {
  username?: string;
  id?: any;
  prenom?: any;
  departement?: any;
  isLoggedIn = false;
  @Input() name: Date;
  demandes:any;
  providerToUpdate:any;
  signatureImg: string | undefined;
  @ViewChild(SignaturePad)
  signaturePad!: SignaturePad;
  
  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 150
    

  };
  constructor(private builder: FormBuilder,private tokenStorageService: TokenStorageService,private service: HelpdeskserviceService,private route: ActivatedRoute) { 
    this.name = new Date();
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
    const name = new Date();
    console.log(name)
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
    date_retour: this.builder.control('', Validators.required),
    name_verified: this.builder.control('', Validators.required),
    reason: this.builder.control('', Validators.required),
    tiquete_id:this.id,
    dataURLChecker:'',
   
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
    materielRetour: this.builder.array([])
  });
  addDemandeReturn(){
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      this.productform.value.tiquete_id=this.id;
      this.productform.value.dataURLChecker=this.signaturePad.toDataURL();
      this.productform.value.name_verified= this.username+' '+this.prenom;
    console.log(this.productform.value);
    
   this.service.saveDemandeRetourVoucher(this.productform.value).subscribe((result)=>{
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

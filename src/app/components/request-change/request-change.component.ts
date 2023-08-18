import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { Materiel } from 'src/app/models/materiel';

@Component({
  selector: 'app-request-change',
  templateUrl: './request-change.component.html',
  styleUrls: ['./request-change.component.css']
})
export class RequestChangeComponent implements OnInit {
  demandes:any;
    materiels: Materiel[]=[];
    employe:any;
    dynamicArray :any= [];
  
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;
    id?: any;
    prenom?: any;
    departement?: any;
    demandess:any;
    providerToUpdate:any;
  constructor(private builder: FormBuilder,private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    

      

      this.username = user.username;
      this.id=user.id;
      this.prenom=user.prenom;
      this.departement=user.departement;
      
  }
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
      this.service.getProvider(this.id).subscribe(
        response => {
        this.demandess= response;
      console.log( this.demandess);
  }
  );
}

formvariant !: FormArray<any>;
productform = this.builder.group({
  date: this.builder.control('', Validators.required),
  tiquete_id:this.id,
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
    this.productform.value.tiquete_id=this.id;
  console.log(this.productform.value);
  
 this.service.saveDemandeChange(this.productform.value).subscribe((result)=>{
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
}
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-edit-telework',
  templateUrl: './edit-telework.component.html',
  styleUrls: ['./edit-telework.component.css']
})
export class EditTeleworkComponent implements OnInit {
  id:any;
  demandes:any;
  isLoggedIn = false;
  constructor(private builder: FormBuilder,private tokenStorageService: TokenStorageService,private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
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
      console.log( this.demandes);

      if (this.demandes.variants != null) {
        for (let i = 0; i < this.demandes.materielTelework.length; i++) {
          this.addRow();
        }
        }


         this.productform.patchValue({
           date: this.demandes.date,
           adresse: this.demandes.adresse,
           materielTelework: this.demandes.materielTelework

         })
    });

    


  }
  formvariant !: FormArray<any>;
  productform = this.builder.group({
    date: this.builder.control('', Validators.required),
    adresse: this.builder.control('', Validators.required),
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
    materielTelework: this.builder.array([])
  });
  updateDemandeTelework(){
   
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
   
      
      
     this.service.updateDemandeTelework(this.id, this.productform.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );
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
  

}

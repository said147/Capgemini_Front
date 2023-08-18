import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  demandes:any;
  id:any;
  isLoggedIn = false;
  constructor(private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute,private builder: FormBuilder,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
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
  productform = this.builder.group({
    
    message: this.builder.control('', Validators.required),
    type_Request:'',
    date:''
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
  
  });
  onVa(){
    if(this.demandes.type_Request=="Asset Handover Form"){
      this.router.navigateByUrl('edit/'+this.id);
      console.log("1")
    }
    else if(this.demandes.type_Request=="ASSET CHANGE FORM"){
      this.router.navigateByUrl('edit-change/'+this.id);
      console.log("1")
    }
    else if(this.demandes.type_Request=="IT Asset return voucher"){
      this.router.navigateByUrl('edit-return/'+this.id);
      console.log("1")
    }
  }

  testEditorContent(){
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
       this.productform.value.type_Request=this.demandes.type_Request;
       this.productform.value.date=this.demandes.date;
      console.log(this.productform.value)
      
     this.service.updateTiquetes(this.id, this.productform.value).subscribe(
      response => {
      
      console.log(response);
      
      }
      );
    }
    window.location.reload();
  }
}

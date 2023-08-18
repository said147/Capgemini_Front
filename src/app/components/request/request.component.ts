import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter'
import { Router } from '@angular/router';

Quill.register('modules/blotFormatter', BlotFormatter)
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit   {
  isLoggedIn = false;
  username?: string;
    id?: any;
    prenom?: any;
    departement?: any;
    form = new FormGroup({});
   
    templateForm: FormGroup;
    quillEditorModules = {};
  constructor(private elementRef: ElementRef, private router: Router,private tokenStorageService: TokenStorageService,private builder: FormBuilder,private service: HelpdeskserviceService) {
    this.templateForm = this.builder.group({
      message: new FormControl(""),
      textEditor: this.builder.control(""),
    });
    this.quillEditorModules = {
      toolbar:[
        [{'font':[]}],
        ['bold','italic','underline'],
        [{'list':'ordered'},{'list':'bullet'}],
        [{'color':[]},{'background':[]}],
        ['link','image']
      ],
      blotFormatter: {}
    }
   }
  
  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.id=user.id;
      this.prenom=user.prenom;
      this.departement=user.departement; 
    }
  }
  productform = this.builder.group({
    type_Request: this.builder.control('', Validators.required),
    message: this.builder.control('', Validators.required),
    
   /*  price: this.builder.control('', Validators.required),
    remarks: this.builder.control(''),
    category: this.builder.control(''),*/
  
  });
  
  addDemande(data:any){
   
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      
     

      
    console.log(data);
    
  /* this.service.saveDemande(this.productform.value).subscribe((result)=>{
    console.warn(result);
  })*/
   
  }






  }

  onsubmit(){
    console.log(this.productform.value);
  }
  testEditorContent(){
    /*alert(this.templateForm.get('textEditor')!.value);*/
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorageService.getUser();
      
     
      console.log(this.productform.value);
      
   
    
  this.service.addTiquete(this.productform.value).subscribe((result)=>{
    console.warn(result);
  })
  this.router.navigate(['/reponse-handover']);
   
  }
    
  }
 
}

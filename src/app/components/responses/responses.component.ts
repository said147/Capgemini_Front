import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
  demandeTelework:any;
  currentPage:number=0;
  size:number=8;
  content:any;
  p:number=1;
  demandeDepart:any;
  motCle:string="";
  pages:Array<number> | undefined;
  constructor(private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.listDemandeTelework().subscribe(
      responses => {
      this.demandeTelework= responses;
    
  
      console.log(this.demandeTelework);
     }
     
     );
     this.service.listDemandeDepart().subscribe(
      response => {
      this.demandeDepart= response;
    
  
      console.log(this.demandeDepart);
     }
     
     );
     
  }
  doSearch() {
    if(this.motCle==""){
      this.ngOnInit();
    }

 else {
  this.service.listProductssee(this.motCle,this.currentPage,this.size).subscribe(
    response => {
    this.demandeTelework= response;
    this.pages=new Array(this.demandeTelework.totalPages);
    
    
    console.log(this.demandeTelework);
   }
   
   );
 }
 if(this.motCle==""){
  this.ngOnInit();
}

else {
this.service.listProductsseee(this.motCle,this.currentPage,this.size).subscribe(
response => {
this.demandeDepart= response;
this.pages=new Array(this.demandeDepart.totalPages);


console.log(this.demandeDepart);
}

);
}
  }
  chercher(){
this.doSearch();
  }
  gotoPage(i:number){
this.currentPage=i;
this.doSearch();

  }
  cancal(){
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
    this.router.navigateByUrl('/resonses');
  }

}

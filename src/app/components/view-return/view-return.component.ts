import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpdeskserviceService } from 'src/app/helpdeskservice.service';

@Component({
  selector: 'app-view-return',
  templateUrl: './view-return.component.html',
  styleUrls: ['./view-return.component.css']
})
export class ViewReturnComponent implements OnInit {
  id:any;
  demandes:any;
  constructor(private service: HelpdeskserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
      this.id = params.get('id_tiquete'); 
      console.log("cc")
      console.log( this.id);
   
      }
      );
      this.service.getDemandeRetourVoucher(this.id).subscribe(
        response => {
        this.demandes= response;
      console.log( this.demandes);
  }
  );
  }

}

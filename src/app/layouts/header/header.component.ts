import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  id?: any;
  prenom?: any;
  constructor(@Inject(DOCUMENT) private document: Document,private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    

      

      this.username = user.username;
      this.id=user.id;
      this.prenom=user.prenom;
      console.log(user);
    }
    
    console.log(this.prenom);
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logout(): void {
    this.tokenStorageService.signOut();
    /*window.location.reload();*/
    this.router.navigate(['pages-login']);
  }
}

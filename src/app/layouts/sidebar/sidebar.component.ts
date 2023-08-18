import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth-service';
import { TokenStorageService } from 'src/app/_services/token-storage-service';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: any;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard=false;
  showQualiteBoard=false;
  showSupeBoard=false;
  showAchatBoard=false;
  showFinanceBoard=false;
  username?: string;
  constructor(@Inject(DOCUMENT) private document: Document,private token: TokenStorageService,private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.showQualiteBoard = this.roles.includes('ROLE_QUALITE');
      this.showSupeBoard = this.roles.includes('ROLE_N');
      this.showAchatBoard = this.roles.includes('ROLE_ACHAT');
      this.showFinanceBoard = this.roles.includes('ROLE_FIANANCE');
      this.username = user.username;
    }
  }
  public isAdmin(): boolean {
    this.currentUser.roles.name=="ROLE_ADMIN";
    return true;
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
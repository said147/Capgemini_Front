import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage-service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  currentUser: any;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.prenom)
  }

}

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'helpdesk-front';
  protected authority: string;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authority = 'lurker';
    if (this.tokenStorage.getToken()) {
        this.authority = this.tokenStorage.getAuthority();
        return true;
    }
  }

  logOut(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}

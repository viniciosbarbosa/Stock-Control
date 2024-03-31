import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private cookieService: CookieService, private router: Router) {}

  logoutApplication() {
    this.cookieService.deleteAll();
    void this.router.navigate(['/login']);
  }
}

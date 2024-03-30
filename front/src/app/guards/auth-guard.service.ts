import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private userService: UserService) {}
}

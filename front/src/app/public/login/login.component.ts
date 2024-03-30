import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterUserComponent } from '../components/register-user/register-user.component';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public loginForm!: FormGroup;
  private ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.carregarLoginForm();
  }

  carregarLoginForm(): void {
    this.loginForm = new FormGroup<any>({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmitLoginForm(): void {
    if (this.loginForm.valid && this.loginForm.value) {
      const params = {
        name: this.loginForm.value,
      };
    }
  }

  openModalRegister(): void {
    this.ref = this.dialogService.open(RegisterUserComponent, {
      header: 'Cadastre seu usuário',
      width: '40%',
      contentStyle: { overflow: 'hidden' },
      baseZIndex: 10000,
      maximizable: true,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

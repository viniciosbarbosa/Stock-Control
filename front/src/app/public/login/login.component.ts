import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterUserComponent } from '../components/register-user/register-user.component';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    private userService: UserService,
    private cockieService: CookieService,
    private messageService: MessageService,
    private router: Router
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
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.userService
        .authUserLogin(params as AuthRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log(response);
            this.cockieService.set('User_Token', response?.token);
            this.cockieService.set('User_Id', response?.id);
            this.loginForm.reset();
            this.router.navigate(['/home']);

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response?.name}!`,
              life: 2000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Error ao criar usuario!',
              life: 2000,
            });

            console.log(err);
          },
        });
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

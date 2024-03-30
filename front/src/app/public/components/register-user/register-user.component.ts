import { CookieService } from 'ngx-cookie-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'primeng/api';
import { RegisterUserRequest } from 'src/app/models/interfaces/user/RegisterUserRequest';
import { Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public registerForm!: FormGroup;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.carregarRegisterForm();
  }

  carregarRegisterForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  handleRegisterUser() {
    if (this.registerForm.valid && this.registerForm.value) {
      this;

      const params = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      console.log(params);

      this.userService
        .registerUser(params as RegisterUserRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.registerForm.reset();
            if (response) {
              this.registerForm.reset();
              this.ref.close();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário criado com sucesso!',
                life: 2000,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao criar usuário!`,
              life: 2000,
            });
            console.log(err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

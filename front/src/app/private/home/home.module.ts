import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routing';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HOME_ROUTES),
    //primeng
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
    ChartModule,
    SharedModule,
  ],

  providers: [MessageService, CookieService],
})
export class HomeModule {}

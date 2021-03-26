import { PipesModule } from './../-pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmRoutingModule } from './adm-routing.module';

import { AdmComponent } from './adm.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdmRoutingModule,
    PipesModule
  ],
  declarations: [
    AdmComponent,
    HomeComponent, 
    MenuComponent, 
    HeaderComponent, 
    FooterComponent
  ]
})
export class AdmModule { }

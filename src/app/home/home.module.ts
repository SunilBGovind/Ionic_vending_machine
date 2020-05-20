import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomeRouter } from './home.router';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomeRouter,ComponentsModule],
  exports:[CommonModule, FormsModule, IonicModule, HomeRouter,ComponentsModule],
  declarations: [HomePage]
})

export class HomePageModule {}

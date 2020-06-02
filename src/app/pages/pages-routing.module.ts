import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicPageComponent } from './basic-page/basic-page.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: BasicPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

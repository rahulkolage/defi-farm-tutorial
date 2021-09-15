import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DefiFarmWebThreeComponent } from './defi-farm-web3.component';

export const routes: Routes = [
  {
    path: '',
    component: DefiFarmWebThreeComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DefiFarmWebThreeComponent
  ]
})
export class DefiFarmWebThreeModule {

}

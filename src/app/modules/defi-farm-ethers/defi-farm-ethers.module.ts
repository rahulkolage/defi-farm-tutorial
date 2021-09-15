import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { DefiFarmEthersComponent } from './defi-farm-ethers.component';

export const routes: Routes = [
  {
    path: '',
    component: DefiFarmEthersComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    DefiFarmEthersComponent
  ]
})
export class DefiFarmEthersModule {

}

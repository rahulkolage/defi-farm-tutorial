import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'defi-farm-ethers', pathMatch: 'full'
  },
  {
    path: 'defi-farm-ethers',
    component: LayoutComponent,
    loadChildren: () => import('./modules/defi-farm-ethers/defi-farm-ethers.module').then(m => m.DefiFarmEthersModule)
  },
  {
    path: 'defi-farm-web',
    component: LayoutComponent,
    loadChildren: () => import('./modules/defi-farm-web3/defi-farm-web3.module').then(m => m.DefiFarmWebThreeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

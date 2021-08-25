import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KlijentComponent } from './components/klijent/klijent.component';
import { KreditComponent } from './components/kredit/kredit.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { TipRacunaComponent } from './components/tip-racuna/tip-racuna.component';


const routes: Routes =
  [
    { path: 'klijent', component: KlijentComponent },
    { path: 'kredit', component: KreditComponent },
    { path: 'tipRacuna', component: TipRacunaComponent },
    { path: 'pocetna', component: PocetnaComponent },
    { path: '', redirectTo: '/pocetna', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

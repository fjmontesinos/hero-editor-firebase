import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyHeroDashboardComponent }   from './components/my-heroes.dashboard.component';
import { MyHeroesComponent }      from './components/my-heroes.component';
import { HeroDetailComponent }  from './components/hero-detail.component';

// Routes tell the router which views to display when a user clicks a link 
// or pastes a URL into the browser address bar.
const routes: Routes = [
    /**
     * We want the app to show the dashboard when it starts and we want to see a 
     * nice URL in the browser address bar that says /dashboard. Remember that the 
     * browser launches with / in the address bar.
     */
  { path: '', redirectTo: '/my-dashboard', pathMatch: 'full' },
  { path: 'my-dashboard',  component: MyHeroDashboardComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'my-heroes',     component: MyHeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

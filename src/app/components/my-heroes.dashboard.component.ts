import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../domain/hero';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: '../views/my-heroes.dashboard.component.html',
    styleUrls: ['../css/dashboard.component.css']

})

export class MyHeroDashboardComponent implements OnInit {
    heroesGet : boolean = false;
    heroes : Hero[];
    constructor (private heroService : HeroService){ }

    ngOnInit() : void {
        this.heroService.getHeroes().then(retHeroes => {
            this.heroes = retHeroes.slice(0, 5);
            this.heroesGet = true;
        });
    }
}

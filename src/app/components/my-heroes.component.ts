import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../domain/hero';
import { HeroService } from '../services/hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: '../views/my-heroes.component.html',
  // MUY IMPORTANTE
  // When we assign styles to a component they are scoped to that specific component.
  styleUrls: ['../css/hero.css']
})

export class MyHeroesComponent implements OnInit { 
  heroesGet : boolean = false;
  heroes : Hero[];

  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
    ) { };

  ngOnInit() : void {
    this.heroService.getHeroes().then((retHeros) => 
        new Promise((resolve) => 
          setTimeout (() => {
            this.heroes = retHeros;
            this.heroesGet = true;            
          }
          , 2000))
      );
  }

  onSelect(hero : Hero) : void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/hero', this.selectedHero.id]);
  }

  // añadir un hero a la lista
  addHero(name : string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  deleteHero(hero : Hero) : void {
    this.heroService.delete(hero.id)
      .then (() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if(this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }

}
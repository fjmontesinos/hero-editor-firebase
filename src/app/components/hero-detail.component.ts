import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location}                  from '@angular/common';

import { Hero } from '../domain/hero';

import { HeroService } from '../services/hero.service';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'hero-detail',
  templateUrl: '../views/hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit {

    @Input()
    hero : Hero;
    
    heroGet : boolean = false;

    constructor(
        private heroService : HeroService,
        private route : ActivatedRoute,
        private location : Location
    ) {}   

    goBack() : void {
      this.location.back();
    }

    save() : void {
      this.heroService.update(this.hero).then(() => this.goBack());
    }

    ngOnInit(): void {
      this.route.params
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(hero => {
          this.hero = hero
          this.heroGet = true;
        });
    }
}
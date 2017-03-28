import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../domain/hero';

/**
 * The consumer of our service doesn't know how the service gets the data. 
 * Our HeroService could get Hero data from anywhere. 
 * It could get the data from a web service or local storage or from a mock 
 * data source.
 */
@Injectable()
export class HeroService {

    // Milisegundos para la llamada a la carga de los héroes
    private ms : number;
    private heroesUrl = 'api/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getHeroes () : Promise<Hero[]> {
        // Milisegundos entre 0 y 3
        //this.ms = (Math.floor(Math.random() * 3) + 0) * 1000;

        // Llamada a promise para simular un delay
        // return new Promise((resolve) => setTimeout(() => resolve(HEROES), this.ms));
        return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
    }

    handleError(error : any){
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;

        //return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero : Hero) : Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);;
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }

    delete(heroId: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${heroId}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

}
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'heroes-app',
    templateUrl : './views/app.component.html',
    styleUrls: ['./css/app.component.css']

})

export class AppComponent {
    title : string = "Tour de Héroes";


}
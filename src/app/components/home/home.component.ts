import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
} )
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    logout() {
        // Remove session Id from local storage
        localStorage.removeItem( 'sessionId' );
    }
}

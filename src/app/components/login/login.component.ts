import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from "app/model/user";
import { STOMPService } from "app/services/stomp";
import { ConfigService } from "app/services/config/config.service";
import { UUID } from 'angular2-uuid';
import { Observable } from "rxjs";
import { Message } from "stompjs";
import { Router } from "@angular/router";

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit, OnDestroy {

    public user = new User( '', '' );
    public errorMsg = '';

    private correlationId = null;
    private config = null;

    // Stream of messages
    private messages: Observable<Message>;

    constructor( private router: Router,
        private _stompService: STOMPService,
        private _configService: ConfigService ) { }

    ngOnInit() {
        // Generate correlation Id
        this.correlationId = UUID.UUID();
    }

    ngOnDestroy() {
        this._stompService.disconnect();
    }

    public login() {
        // Get stomp config
        this._configService.getConfig( 'api/config.json' ).then(
            config => {
                // Connect to login queue
                config.correlationId = this.correlationId;
                config.selector = "JMSCorrelationID = '" + this.correlationId + "'";
                config.queue = 'login';
                this.config = config;

                this._stompService.configure( config );
                this._stompService.try_connect().then( this.on_connect );
            }
        );
    }

    /** Callback on_connect to queue */
    public on_connect = () => {

        // Send login message to login queue
        let message = {
            email: this.user.email,
            password: this.user.password,
            msgType: 'loginMC',
            sessionId: this.correlationId,
            responseQueue: 'loginResponse'
        };
        this._stompService.publish( JSON.stringify( message ), this.correlationId );

        // Store local reference to Observable
        this.messages = this._stompService.messages;

        // Subscriber to the login response queue
        this.config.queue = message.responseQueue;
        this._stompService.subscribe();

        // Subscribe a function to be run after receiving login response
        this.messages.subscribe( this.on_next );
    }

    /** Consume a message from the _stompService */
    public on_next = ( message: Message ) => {
        let msg = JSON.parse( message.body );

        if ( msg.type == 'loginMS' ) {
            // Save the sessionId
            localStorage.setItem( "sessionId", msg.sessionId );

            // Disconnect STOMP
            this._stompService.disconnect();

            // Redirect to Home
            this.router.navigate( ['/home'] );
        }
    }
}

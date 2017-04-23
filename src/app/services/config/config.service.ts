import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { StompConfig } from '../stomp';

/**
 * An injected class which grabs the application
 * config variables (e.g. STOMP credentials)
 * for the user application.
 *
 * This makes an AJAX request to the server
 * api containing some user token and secret
 *
 * @type ConfigService
 */
@Injectable()
export class ConfigService {

    // TODO: Provide a user object to the constructor
    //       to allow retrieval of per-user configs
    //       or from a specific URL.
    /** Constructor */
    constructor( private _http: Http ) { }


    /** Make an http request for a config file, and
      * return a Promise for its resolution.
      */
    public getConfig( path ): Promise<StompConfig> {
        let config: StompConfig = {
            "host": "localhost",
            "port": 61614,
            "ssl": false,
            "user": "",
            "pass": "",
            "queue": "",
            "selector": "",
            "heartbeat_in": 0,
            "heartbeat_out": 20000,
            "debug": true,
            "correlationId": "",
        };
        return Promise.resolve( config );
    }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ConfigService } from "app/services/config/config.service";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "app/app-routing.module";
import { STOMPService } from "app/services/stomp";
import { AuthGuard } from "app/services/auth-guard/auth.guard";

@NgModule( {
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        AppRoutingModule
    ],
    providers: [ConfigService, STOMPService, AuthGuard],
    bootstrap: [AppComponent]
} )
export class AppModule { }

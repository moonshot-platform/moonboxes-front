import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgParticlesModule } from "ng-particles";

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownConfig, CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function countdownConfigFactory(): CountdownConfig {
  return {};
}

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GtagModule } from 'angular-gtag';
import { MoonbaseModule } from './components/moonbase/moonbase.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    CountdownModule,
    NgParticlesModule,
    BrowserAnimationsModule,
    MatDialogModule,
    GtagModule.forRoot({ trackingId: 'G-5Q9LF9T9Q6', trackPageviews: true }),
    MoonbaseModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: CountdownGlobalConfig, useFactory: countdownConfigFactory },
  {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }],
  bootstrap: [AppComponent],
  exports: [
    AppRoutingModule
  ]
})
export class AppModule { }

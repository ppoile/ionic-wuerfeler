import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, LoadingController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { of, Subject, timer } from 'rxjs';
import { delay, exhaustMap, flatMap, last, map, take, tap } from 'rxjs/operators';
const { App } = Plugins;

import { Cube } from './cube';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  stepTimeInMsec = 250;
  cube: Cube;
  cubeValue: Number;
  cubeValueStyle: string;
  source: any;

  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        console.log('exiting...');
        App.exitApp();
      }
      else {
        console.log('cannot exit');
      }
    });
    this.cube = new Cube();
    this.setupStream();
  }

  ngOnInit() {
    this.source.next();
  }

  private setupStream() {
    this.source = new Subject();
    this.source.pipe(
      exhaustMap(this.cubeValueStream),
    ).subscribe();
  }

  private cubeValueStream = () => {
    return of({}).pipe(
      tap(i => this.setCubeValueHide(true)),
      flatMap(this.progressSpinnerStream),
      map(i => this.cube.next()),
      tap(i => this.setCubeValue(i)),
      tap(i => this.setCubeValueHide(false)),
      delay(this.stepTimeInMsec),
    );
  };

  private progressSpinnerStream = () => {
    const muchTooLong = 10 * this.stepTimeInMsec;
    this.loadingController.create({}).then((res) => {
      res.present();
    });
    const source = timer(this.stepTimeInMsec);
    return source.pipe(
      tap(i => this.loadingController.dismiss()),
    );
  };

  private setCubeValue(value) {
    return this.cubeValue = value;
  }

  public onButtonClick() {
    this.source.next();
  }

  public setCubeValueHide(doHide: boolean = true) {
    let opacityValue = 1;
    if (doHide) {
      opacityValue = 0.4;
    }
    this.cubeValueStyle = `opacity:${opacityValue}`;
  }
}

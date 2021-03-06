import { Injectable } from '@angular/core';
import { Security } from '../models/security';
import { Subject } from 'rxjs';
import { ConfigService } from '@ngx-config/core';
import { ToastrService } from 'ngx-toastr';
import { SocketFactoryService } from './socket-factory.service';
import { SymbolPrice } from '../models';

import { map } from 'rxjs/operators';
import { slidingWindow } from '../operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityStoreService {
  apiUrl: string;
  favoriteLengthLimit: number;

  wsSubject: Subject<Security>;
  securityList: Security[] = [];

  securityList$: Subject<Security[]> = new Subject<Security[]>();
  favoriteSecurityList$: Subject<Security[]> = new Subject<Security[]>();

  constructor(private config: ConfigService,
              private socketFactory: SocketFactoryService,
              private toastr: ToastrService) {

    this.setConfiguration();
    this.createWebSocket();
  }


  setFavoriteState(symbol: string, state: boolean) {
    // Check if limitation on number of favorite
    if (state) {
      const favoriteCount = this.securityList.filter(m => m.isFavorite).length;
      if (favoriteCount >= this.favoriteLengthLimit) {
        this.toastr.error(`Error in adding ${symbol} to favorite list. you reach the maximum 10.`);
        return;
      }
    }

    // Set the state
    const index = this.securityList.findIndex(
      m => m.symbol === symbol
    );

    if (index > -1) {
      this.securityList[index].isFavorite = state;
    }

    this.refreshSubjects();
  }

  private setConfiguration() {
    this.apiUrl = this.config.getSettings('apiUrl');
    this.favoriteLengthLimit = this.config.getSettings('favoriteLengthLimit');
  }

  private createWebSocket() {
    this.wsSubject = this.socketFactory.create(this.apiUrl);

    // Subscribe to events
    this.wsSubject.pipe(
      slidingWindow(30000),
      map((arr: SymbolPrice[]) => {
        const current = arr[arr.length - 1];
        const prices = arr.filter(el => el.symbol === current.symbol).map(el => el.price);

        return {
          price: current.price,
          symbol: current.symbol,
          averagePrice: prices.reduce((acc, curr) => acc + curr, 0) / prices.length,
          isFavorite: false
        }
      })).subscribe(msg => this.handleNewMessage(msg),
      err => console.log(err), // TODO: Better error handling needed for the server error
      () => console.log('complete'));
  }

  private handleNewMessage = (update: Security) => {
    const index = this.securityList.findIndex(
      m => m.symbol === update.symbol
    );

    if (index > -1) {
      const current = this.securityList[index];
      if (current.price !== update.price) {
        current.price = update.price;
      }
    } else {
      this.securityList.push(update);
    }

    this.refreshSubjects();
  }

  private refreshSubjects() {
    this.securityList$.next(this.securityList.sort(this.sort));
    this.favoriteSecurityList$.next(this.securityList.filter(m => m.isFavorite).sort(this.sort));
  }

  private sort = (a: Security, b: Security) => a.symbol > b.symbol ? 1 : -1;
}

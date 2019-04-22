import { Injectable } from '@angular/core';
import { Security } from '../models/security';
import { Subject } from 'rxjs';
import { ConfigService } from '@ngx-config/core';
import { ToastrService } from 'ngx-toastr';

const FavoriteLengthLimit = 10;

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  ws: WebSocket;
  securityList: Security[] = [];

  securityList$: Subject<Security[]> = new Subject<Security[]>();
  favoriteSecurityList$: Subject<Security[]> = new Subject<Security[]>();

  constructor(private config: ConfigService,
              private toastr: ToastrService) {

    this.ws = this.createWebSocket();
    this.ws.onmessage = this.handleNewMessage;
  }

  setFavoriteState(symbol: string, state: boolean) {
    // Check if limitation on number of favorite
    if (state) {
      const favoriteCount = this.securityList.filter(m => m.isFavorite).length;
      if (favoriteCount >= FavoriteLengthLimit) {
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

  private createWebSocket(): WebSocket {
    const url = this.config.getSettings('apiUrl');
    return new WebSocket(url);
  }

  private handleNewMessage = (msg: MessageEvent) => {
    const update = JSON.parse(msg.data) as Security;

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

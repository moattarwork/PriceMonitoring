import { Injectable } from '@angular/core';
import { Security } from '../models/security';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketFactoryService {

  constructor() { }

  create(url: string) {
    return webSocket<Security>(url);
  }
}

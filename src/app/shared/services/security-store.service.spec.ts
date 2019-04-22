import { TestBed } from '@angular/core/testing';

import { SecurityStoreService } from './security-store.service';
import { ConfigService } from '@ngx-config/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MockConfigService } from '../testing/mock-config.service';
import { SocketFactoryService } from './socket-factory.service';
import { BehaviorSubject } from 'rxjs';
import { Security } from '../models/security';

describe('SecurityStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot()],
    providers: [
      { provide: ConfigService, useClass: MockConfigService},
    ]
  }));

  it('should be created', () => {
    const service: SecurityStoreService = TestBed.get(SecurityStoreService);
    expect(service).toBeTruthy();
  });

  it('should add the incoming changes to securityList', () => {
    const subject = new BehaviorSubject<Security>({ symbol: 'A', price: 2.2, isFavorite: false });
    const socketFactory: SocketFactoryService = TestBed.get(SocketFactoryService);

    spyOn(socketFactory, 'create').and.returnValue(subject);

    const service: SecurityStoreService = TestBed.get(SecurityStoreService);
    service.securityList$.subscribe((values: Security[]) => {
      expect(values.length).toBe(2);
      expect(values[0]).toEqual({ symbol: 'A', price: 2.2, isFavorite: false });
      expect(values[1]).toEqual({ symbol: 'B', price: 2.2, isFavorite: false });
    });

    subject.next({symbol: 'B', price: 2.2, isFavorite: false});
  });

  it('should add to favorite list when setFavoriteState is called with true status', () => {
    const subject = new BehaviorSubject<Security>({ symbol: 'A', price: 2.2, isFavorite: false });
    const socketFactory: SocketFactoryService = TestBed.get(SocketFactoryService);

    spyOn(socketFactory, 'create').and.returnValue(subject);

    const service: SecurityStoreService = TestBed.get(SecurityStoreService);
    service.favoriteSecurityList$.subscribe((values: Security[]) => {
      expect(values.length).toBe(1);
      expect(values[0]).toEqual({ symbol: 'A', price: 2.2, isFavorite: true });
    });

    service.setFavoriteState('A', true);
  });

  it('should remove from favorite list when setFavoriteState is called with false status', () => {
    const subject = new BehaviorSubject<Security>({ symbol: 'A', price: 2.2, isFavorite: true });
    const socketFactory: SocketFactoryService = TestBed.get(SocketFactoryService);

    spyOn(socketFactory, 'create').and.returnValue(subject);

    const service: SecurityStoreService = TestBed.get(SecurityStoreService);
    service.favoriteSecurityList$.subscribe((values: Security[]) => {
      expect(values.length).toBe(0);
    });

    service.setFavoriteState('A', false);
  });

  it('should display error and avoid adding to favorite list when favorite list reaches the limit', () => {
    const subject = new BehaviorSubject<Security>({ symbol: 'A', price: 2.2, isFavorite: false });
    const socketFactory: SocketFactoryService = TestBed.get(SocketFactoryService);
    const toastr: ToastrService = TestBed.get(ToastrService);

    spyOn(socketFactory, 'create').and.returnValue(subject);
    spyOn(toastr, 'error');

    const service: SecurityStoreService = TestBed.get(SecurityStoreService);

    subject.next({ symbol: 'B', price: 2.2, isFavorite: false });
    subject.next({ symbol: 'C', price: 2.2, isFavorite: false });

    service.setFavoriteState('A', true);
    service.setFavoriteState('B', true);
    service.setFavoriteState('C', true);

    expect(toastr.error).toHaveBeenCalled();
  });

});

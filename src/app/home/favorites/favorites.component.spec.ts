import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FavoritesComponent } from './favorites.component';
import { ConfigService, ConfigLoader } from '@ngx-config/core';
import { ToastrModule } from 'ngx-toastr';
import { SecurityStoreService, MockConfigService } from '../../shared';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let securityService: SecurityStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [
        { provide: ConfigService, useClass: MockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    securityService = TestBed.get(SecurityStoreService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display 3 rows when 3 security is available', async () => {
    const securities = [
      { symbol: 'A', price: 2.1234, averagePrice: 4.12, isFavorite: true },
      { symbol: 'B', price: 3.1234, averagePrice: 4.12, isFavorite: true },
      { symbol: 'C', price: 4.1234, averagePrice: 4.12, isFavorite: true },
    ];

    securityService.favoriteSecurityList$.next(securities);
    fixture.detectChanges();

    await fixture.whenStable();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('table.table tbody tr').length).toBe(3);
  });

  it('should call set favorite from security service when add is called', async () => {
    const securities = [
      { symbol: 'A', price: 2.1234, averagePrice: 4.12, isFavorite: true },
    ];

    const spy = spyOn(securityService, 'setFavoriteState');

    securityService.favoriteSecurityList$.next(securities);
    fixture.detectChanges();

    await fixture.whenStable();

    const compiled = fixture.debugElement.nativeElement;
    const anchor = compiled.querySelector('table.table tbody tr > td > a');
    anchor.click();

    expect(securityService.setFavoriteState).toHaveBeenCalled();
  });
});

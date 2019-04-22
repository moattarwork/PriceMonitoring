import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecuritiesComponent } from './securities.component';
import { ConfigService } from '@ngx-config/core';
import { ToastrModule } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Security, SecurityService, MockConfigService } from '../../shared';

describe('SecuritiesComponent', () => {
  let component: SecuritiesComponent;
  let fixture: ComponentFixture<SecuritiesComponent>;
  let securityService: SecurityService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritiesComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [{ provide: ConfigService, useClass: MockConfigService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    securityService = TestBed.get(SecurityService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 10 rows when 10 security is available', async () => {
    const securities = [
      { symbol: 'A', price: 2.1234, isFavorite: false },
      { symbol: 'B', price: 3.1234, isFavorite: false },
      { symbol: 'C', price: 4.1234, isFavorite: false },
    ];

    securityService.securityList$.next(securities);
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('table.table tbody tr').length).toBe(3);
  });

  it('should call set favorite from security service when add is called', async () => {
    const securities = [
      { symbol: 'A', price: 2.1234, isFavorite: false },
    ];

    const spy = spyOn(securityService, 'setFavoriteState');

    securityService.securityList$.next(securities);
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const anchor = compiled.querySelector('table.table tbody tr > td > a');
    anchor.click();

    expect(securityService.setFavoriteState).toHaveBeenCalled();
  });
});

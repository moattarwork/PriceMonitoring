import { CardComponent } from './../shared/components/card/card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SecuritiesComponent } from './securities/securities.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockConfigService } from '../shared/testing/mock-config.service';
import { ConfigService } from '@ngx-config/core';
import { ToastrModule } from 'ngx-toastr';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, FavoritesComponent, SecuritiesComponent, CardComponent ],
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: ConfigService, useClass: MockConfigService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should does have favorite and security list', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#securities').length).not.toBeNull();
    expect(compiled.querySelector('#favorites').length).not.toBeNull();
  });
});

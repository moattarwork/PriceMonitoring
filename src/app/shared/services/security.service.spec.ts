import { TestBed } from '@angular/core/testing';

import { SecurityService } from './security.service';
import { ConfigService } from '@ngx-config/core';
import { ToastrModule } from 'ngx-toastr';
import { MockConfigService } from '../testing/mock-config.service';

describe('SecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot()],
    providers: [
      { provide: ConfigService, useClass: MockConfigService},
    ]
  }));

  it('should be created', () => {
    const service: SecurityService = TestBed.get(SecurityService);
    expect(service).toBeTruthy();
  });
});

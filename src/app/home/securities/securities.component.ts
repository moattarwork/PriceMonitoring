import { Security, SecurityStoreService } from './../../shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-securities',
  templateUrl: './securities.component.html',
  styleUrls: ['./securities.component.scss']
})
export class SecuritiesComponent implements OnInit {
  securities: Security[];

  constructor(private priceService: SecurityStoreService) {}

  ngOnInit() {
    this.priceService.securityList$.subscribe((securities: Security[]) => {
      this.securities = securities;
    });
  }

  addToFavorites(security: Security) {
    this.priceService.setFavoriteState(security.symbol, true);
  }
}

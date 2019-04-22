import { Security } from './../../shared/models/security';
import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../shared/services/security.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  securities: Security[];

  constructor(private priceService: SecurityService) { }

  ngOnInit() {
    this.priceService.favoriteSecurityList$.subscribe((securities: Security[]) => {
      this.securities = securities;
    });
  }

  removeFromFavorites(security: Security) {
    this.priceService.setFavoriteState(security.symbol, false);
  }
}

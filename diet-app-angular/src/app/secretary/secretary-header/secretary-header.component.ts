import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-secretary-header',
  templateUrl: './secretary-header.component.html',
  styleUrls: ['./secretary-header.component.css']
})
export class SecretaryHeaderComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.tokenService.logout();
  }
}

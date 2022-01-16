import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.tokenService.logout();
  }
}

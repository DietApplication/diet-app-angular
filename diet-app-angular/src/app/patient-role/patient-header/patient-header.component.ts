import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css']
})
export class PatientHeaderComponent implements OnInit {
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.tokenService.logout();
  }

}

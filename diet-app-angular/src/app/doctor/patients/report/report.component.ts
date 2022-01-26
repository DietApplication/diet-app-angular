import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  private routeSub: Subscription;
  idPatient: number;
  surveyResult: any;
  newResults: any[] = [];
  error: string;
  constructor(private reportService: ReportService, cdref: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idPatient = params['idPatient'];
    });
    this.onGetReport();
  }

  onGetReport() {
    this.reportService.getReport(this.idPatient).subscribe((res) => {
      this.surveyResult = res.initialReport;
      this.newResults = res.newReports;
      console.log(this.surveyResult);
      console.log(this.newResults);
    }, (err) => {
      this.error = err.error;
    })
  }
  onHandleError() {
    this.error = null;
  }
}

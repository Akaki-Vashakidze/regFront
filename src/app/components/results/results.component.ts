import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ResultsService } from 'src/app/services/results.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit{
  results: any = [];
  slowInternet : boolean = false;
  dataSource: any;
  columns: string[] = ['name', 'date', 'course', 'results'];
  loading: boolean = false;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  innerWidth: any;
  constructor(private _resultsService: ResultsService, private _router: Router, private _authService: AuthService) { }

  //  slowIntTimeout = setTimeout(() => {
  //   if(this.loading == true) {
  //   this.slowInternet = true;
  //   // this._authService.errorItem.next('slow Internet (results), please check internet connection and tru again!')
  //   this.loading = false;
  //    alert('slow internet problem (results), check internet connection and try again')
  //   }
  
  //  }, 5000);

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.loading = true;
     this._resultsService.getResults()
      .subscribe(
        res => {
          this.loading = false;
          this.slowInternet = false;
          this.results = res;
          this.dataSource = new MatTableDataSource(this.results);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err => {
          this._router.navigate(['/login'])
          this._authService.SignedIn.next(false)
        }
      )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onResize() {
    this.innerWidth = window.innerWidth;
}

  seeResults(item:any){
    this._router.navigate(['/meetResults',item._id])
  }
}

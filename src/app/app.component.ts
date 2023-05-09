import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
  }


  title="FoodTrucks"

  data$: Observable<any[]> = <any>[];

  ngOnInit() {
    this.data$ = this.http.get<any[]>('/api/foodtrucks');
  }

}

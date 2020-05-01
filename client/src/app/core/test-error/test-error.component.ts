import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    const url = `${this.baseUrl}products/42`;

    return this.http.get(url)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  get500Error() {
    const url = `${this.baseUrl}buggy/servererror`;

    return this.http.get(url)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  get400Error() {
    const url = `${this.baseUrl}buggy/badrequest`;

    return this.http.get(url)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  get400ValidationError() {
    const url = `${this.baseUrl}products/fortytwo`;

    return this.http.get(url)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
        this.validationErrors = error.errors;
      });
  }
}

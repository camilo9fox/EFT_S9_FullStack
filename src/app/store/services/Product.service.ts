import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer bb51d123-fa05-49bc-9887-56546e682869',
    }),
  };

  private jsonUrl = `https://firebasestorage.googleapis.com/v0/b/exp3-s8-json.appspot.com/o/products.json?alt=media&token=bb51d123-fa05-49bc-9887-56546e682869?timestamp=${new Date().getTime()}`;

  constructor(private http: HttpClient) {}

  getProductsData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}

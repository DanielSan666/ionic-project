import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url="http://localhost:5000/api/product"

  constructor(private http:HttpClient) { }


  getProduct():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }
}

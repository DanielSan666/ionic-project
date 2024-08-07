import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url="http://localhost:5000/api/product"

  constructor(private http:HttpClient) { }


  getProduct():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }

  addProduct(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, product);
  }

  editProduct(product: Producto): Observable<Producto> {
    const editUrl = `${this.url}`; // Asegura que el ID esté en la URL
    return this.http.patch<Producto>(editUrl, product);
  }

  deleteProduct(id: string): Observable<Producto> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<Producto>(deleteUrl);
  }
}

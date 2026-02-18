import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Restmessage } from '../interfaces/restmessage';
import { Producto } from '../interfaces/producto';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private peticion:HttpClient, private router:Router) { }

  recuperarProductos(){
    return this.peticion.get<Producto[]>(`http://localhost:3000/productos/listar`)
  }
  recuperarCategorias(){
    return this.peticion.get<Categoria[]>(`http://localhost:3000/productos/obtenerCategorias`)
  }
  eliminarProducto(id:number){
    return this.peticion.post<Restmessage>(`http://localhost:3000/productos/eliminar`,{id})
  }
  editarProducto(producto:Producto){
    return this.peticion.post<Restmessage>(`http://localhost:3000/productos/editar`,producto)
  }
  obtenerProducto(id:number){
    return this.peticion.post<Producto>(`http://localhost:3000/productos/obtener`,{id})
  }
  recuperarOferta(id:number){
    return this.peticion.post<Producto>(`http://localhost:3000/productos/obtenerOferta`,{id})
  }
  recuperarOfertas(){
    return this.peticion.get<Producto[]>(`http://localhost:3000/productos/obtenerOfertas`)
  }

}

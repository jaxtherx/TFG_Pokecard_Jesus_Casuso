import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { Restmessage } from '../interfaces/restmessage';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private peticion:HttpClient, private router:Router) { }

  obtenerPedidos(usuario_id:number):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/pedidos/obtenerPedidos`,{usuario_id}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
      return new Observable<Restmessage>((subscriber)=>{
        subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
      });
     }));

  }
  borrarPedido(id:number):Observable<Restmessage>{
    return this.peticion.post<Restmessage>(`http://localhost:3000/pedidos/borrarPedido`,{id}, {headers: new HttpHeaders(
      { 'Content-Type': 'application/json'}), withCredentials: true }
     ).pipe(catchError( (error: HttpErrorResponse): Observable<Restmessage> => {
      return new Observable<Restmessage>((subscriber)=>{
        subscriber.next({codigo:500,mensaje:'credenciales erroneas',error:'Unauthorized'});
      });
     }));

  }

}

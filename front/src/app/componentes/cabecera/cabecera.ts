import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalService } from '../../servicios/local.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { Lusuario } from '../../interfaces/lusuario';
import { signal } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  imports: [],
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cabecera { 

  public usuario:any
  public cantidad = signal<number>(0)

  constructor(private local:LocalService, router:Router, private carritoService: CarritoService){ 


   

 }

 async ngOnInit(){
    this.usuario = this.local.recuperarUsuario()
    if(this.usuario){
    }
    this.cantidadTotal()
 }

 cantidadTotal(){
   this.carritoService.cantidadTotal(this.usuario.id).subscribe({
    next: (data: any) => {
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        this.cantidad.set(Number(data.data[0].cantidad));
      }
    },
    error: (e) => {
      console.error(e);
    }
  });
 }



}

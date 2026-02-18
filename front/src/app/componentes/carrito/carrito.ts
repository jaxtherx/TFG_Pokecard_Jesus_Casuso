import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../servicios/productos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../interfaces/categoria';
import { LocalService } from '../../servicios/local.service';
import { Lusuario } from '../../interfaces/lusuario';
import { Router } from '@angular/router';
import { ItemCarrito } from '../../interfaces/itemCarrito';
import { CarritoService } from '../../servicios/carrito.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [Cabecera, Piepagina, ReactiveFormsModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carrito { 
  public carrito = signal<ItemCarrito[]>([]);
  public usuario:any


  constructor(private local:LocalService, private router:Router, private carritoService:CarritoService) {

  }


  ngOnInit():void{
   this.usuario=this.local.recuperarUsuario()
   this.listarCarrito()
   if(!this.usuario){
    this.router.navigate(['home'])
   }
   
  }

  listarCarrito(){
    this.carritoService.obtenerCarrito(this.usuario.id).subscribe((res: any) => {
      this.carrito.set(res.data)
    })
  }

  eliminarProducto(producto_id:number){
    console.log(producto_id)
    this.carritoService.eliminarProducto(this.usuario.id, producto_id).subscribe((res: any) => {
      this.listarCarrito()
      location.reload()
    })
  }






 }


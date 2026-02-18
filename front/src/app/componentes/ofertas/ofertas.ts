import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import { Piepagina} from "../piepagina/piepagina";
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../servicios/productos.service';
import { RouterLink } from '@angular/router';

@Component({ 
  selector: 'app-ofertas',
  imports: [Cabecera, Piepagina, RouterLink],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ofertas { 

public productos = signal<Producto[]>([]);
public cargando  = true;

constructor(private productosService:ProductosService){
  
}

ngOnInit():void{
   this.listarProductos()
   this.listarOfertas()
}

 listarProductos(){
  this.productosService.recuperarProductos().subscribe(res=>{
    this.productos.set(res)
  })
}
listarOfertas(){
  this.productosService.recuperarOfertas().subscribe(res=>{
    this.productos.set(res)
  })
 }
}

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import{ Piepagina} from "../piepagina/piepagina";
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../servicios/productos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cartas',
  imports: [Cabecera, Piepagina, RouterLink],
  templateUrl: './cartas.html',
  styleUrl: './cartas.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cartas { 

public productos = signal<Producto[]>([]);
public cargando  = true;

constructor(private productosService:ProductosService){
  
}

ngOnInit():void{
   this.listarProductos()
}

 listarProductos(){
  this.productosService.recuperarProductos().subscribe(res=>{
    this.productos.set(res)
  })
}


 }

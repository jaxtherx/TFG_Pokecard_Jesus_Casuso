import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import{ Piepagina} from "../piepagina/piepagina";
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../servicios/productos.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-accesorios',
  imports: [Cabecera, Piepagina, RouterLink],
  templateUrl: './accesorios.html',
  styleUrl: './accesorios.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accesorios { 

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

prueba(){
  console.log(this.productos);
}
}


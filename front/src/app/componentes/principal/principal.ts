import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import{ Piepagina} from "../piepagina/piepagina";
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../servicios/productos.service';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal',
  imports: [Cabecera, Piepagina, SlicePipe, RouterLink],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Principal { 

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

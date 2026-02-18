import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../servicios/productos.service';
import { Producto } from '../../interfaces/producto';
import { signal } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';
import { CarritoService } from '../../servicios/carrito.service';
import { LocalService } from '../../servicios/local.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-producto',
  imports: [Cabecera, Piepagina, RouterLink],
  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerProducto { 

  public producto = signal<Producto | undefined>(undefined);
  cantidad: number = 1;
  public id:any
  public usuario:any

  constructor(private route: ActivatedRoute, private productoService: ProductosService, private carritoService: CarritoService, private localService: LocalService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.usuario = this.localService.recuperarUsuario();

    if (this.id) {
      this.productoService.obtenerProducto(Number(this.id)).subscribe({
        next: (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            this.producto.set(data[0]);
          }
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }

  agregarProducto(){
    const usuario = this.localService.recuperarUsuario();
    this.carritoService.agregarProducto(usuario.id, this.id, this.cantidad).subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          this.producto.set(data[0]);
        }
      },
      error: (e) => {
        console.error(e);
      }
    });
    location.reload()
  }

  incrementar() {
    this.cantidad++;
  }

  decrementar() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

 }
 

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';
import { Pedido } from '../../interfaces/pedido';
import { signal } from '@angular/core';
import { LocalService } from '../../servicios/local.service';
import { Router } from '@angular/router';
import { PedidosService } from '../../servicios/pedidos.service';


@Component({
  selector: 'app-lista-pedidos',
  imports: [Cabecera, Piepagina, DatePipe],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaPedidos {  

  public pedidos = signal<Pedido[]>([]);
  private usuario:any

  constructor(private local:LocalService,private router:Router, private pedidosService:PedidosService){
  }

  ngOnInit(): void {
    this.usuario = this.local.recuperarUsuario();
    if(this.usuario){
      this.obtenerPedidos();
    }else{
      this.router.navigate(['/home']);
    }

  }

  public obtenerPedidos(){
    this.pedidosService.obtenerPedidos(this.usuario.id).subscribe((res: any) => {
      this.pedidos.set(res.data)
    })
  }
  public borrarPedido(id:number){
    this.pedidosService.borrarPedido(id).subscribe((res: any) => {
      this.obtenerPedidos();
    })
  }

  

}

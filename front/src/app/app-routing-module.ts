import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ofertas } from './componentes/ofertas/ofertas';
import { Principal } from './componentes/principal/principal';
import { Iniciosesion } from './componentes/iniciosesion/iniciosesion';
import { Cartas } from './componentes/cartas/cartas';
import { Boxes } from './componentes/boxes/boxes';
import { Accesorios } from './componentes/accesorios/accesorios';
import { Menu } from './componentes/menu/menu';
import { Sobrenosotros } from './componentes/sobrenosotros/sobrenosotros';
import { Politicas } from './componentes/politicas/politicas';
import { Legal } from './componentes/legal/legal';
import { Envio } from './componentes/envio/envio';
import { Contacto } from './componentes/contacto/contacto';
import { Terminos } from './componentes/terminos/terminos';
import { Reembolso } from './componentes/reembolso/reembolso';
import { ListaProductos } from './componentes/lista-productos/lista-productos';
import { VerProducto } from './componentes/ver-producto/ver-producto';
import { Carrito } from './componentes/carrito/carrito';
import { Pago } from './componentes/pago/pago';
import { ListaPedidos } from './componentes/lista-pedidos/lista-pedidos';

const routes: Routes = [

  {path: 'ofertas', component:Ofertas},
  {path: 'iniciosesion', component:Iniciosesion},
  {path: 'home', component:Principal},
  {path: 'cartas', component:Cartas},
  {path: 'boxes', component:Boxes},
  {path: 'accesorios', component:Accesorios},
  {path: 'menu', component:Menu},
  {path: 'politicas', component:Politicas},
  {path: 'legal', component:Legal},
  {path: 'envio', component:Envio},
  {path: 'contacto', component:Contacto},
  {path: 'terminos', component:Terminos},
  {path: 'reembolso', component:Reembolso},
  {path: 'sobrenosotros', component:Sobrenosotros},
  {path: 'lista-productos', component:ListaProductos},
  {path:'' , pathMatch:'full' , redirectTo:'home'},
  { path: 'producto/:id', component: VerProducto },
  {path: 'carrito', component:Carrito},
  {path: 'pago', component:Pago},
  {path: 'lista-pedidos', component:ListaPedidos},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalService } from '../../servicios/local.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-pago',
  imports: [Cabecera, Piepagina, ReactiveFormsModule],
  templateUrl: './pago.html',
  styleUrl: './pago.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pago { 

  public formPago:FormGroup
  public usuario:any

  constructor(private local:LocalService, private router:Router, private carritoService:CarritoService, private notificacion:ToastrService){
    this.formPago=new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        numero: new FormControl('', [Validators.required, Validators.min(16)]),
        caducidad: new FormControl('', [Validators.required]),
        cvv: new FormControl('', [Validators.required])
      })
  }

  ngOnInit():void{
    this.usuario=this.local.recuperarUsuario()
    if(!this.usuario){
      this.router.navigate(['/home'])
    }
  }

  finalizarCompra(){
    if(!this.formPago.valid){
      this.notificacion.error("Tienes que rellenar todos los campos", "Pago")
    }else{
      this.carritoService.finalizarCompra(this.usuario.id).subscribe((res: any) => {
      })
      this.router.navigate(['/home'])
    }
  }


}

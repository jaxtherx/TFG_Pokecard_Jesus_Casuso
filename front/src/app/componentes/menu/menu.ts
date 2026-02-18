import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import { Piepagina } from '../piepagina/piepagina';
import { LocalService } from '../../servicios/local.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [Cabecera, Piepagina, ReactiveFormsModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {

  public usuario:any
  public formCambiarContrasena:FormGroup

  constructor(private local:LocalService, private router:Router, private login:LoginService, private fb:FormBuilder){
    this.formCambiarContrasena = this.fb.group({
      contrasena: ['', Validators.required],
    })

  }

  async ngOnInit(){
    this.usuario = this.local.recuperarUsuario()
    if(!this.usuario){
      this.router.navigate(['home'])
    }
  }

  cerrarSesion(){
  this.local.borrarSession()
  this.router.navigate(['home'])
 }

 cambiarContrasena(){
  console.log(this.formCambiarContrasena.value.contrasena)
    this.login.cambiarContrasena(this.usuario.id, this.formCambiarContrasena.value.contrasena).subscribe(res=>{
      if(res.codigo == 0){
        this.local.borrarSession()
        this.router.navigate(['home'])
      }
    })
 }

 }

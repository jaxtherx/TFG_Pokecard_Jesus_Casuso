import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalService } from '../../servicios/local.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-iniciosesion',
  imports: [ReactiveFormsModule],
  templateUrl: './iniciosesion.html',
  styleUrl: './iniciosesion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Iniciosesion {  

    public formLogin:FormGroup
    public usuario:any
    public registrar:boolean = false
    public formRegister:FormGroup

    constructor(private iniciosesion:LoginService, private router:Router, private local:LocalService, private notificacion:ToastrService){
      this.formLogin=new FormGroup({
        email: new FormControl('', [Validators.required]),
        passwd: new FormControl('', [Validators.required])
      })
      this.formRegister=new FormGroup({
        email: new FormControl('', [Validators.required]),
        passwd: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [Validators.required]),
      })
    }

    async login(){
      if(!this.formLogin.valid){
        this.notificacion.error("Tienes que rellenar todos los campos", "Inicio sesion")
      }else{
        this.iniciosesion.Login(this.formLogin.controls['email'].value,this.formLogin.controls['passwd'].value).subscribe(data=>{
          if(data.codigo === 1){
            this.notificacion.error("No existe ningun usuario con ese email", "Inicio sesion")
          }else if(data.codigo === 2){
            this.notificacion.error("Contraseña incorrecta", "Inicio sesion")
          }else{
            this.usuario = data
            if(this.usuario){
            this.local.guardarUsuario(this.usuario)
            this.notificacion.success("Has iniciado sesion correctamente", "Inicio sesion")
            this.router.navigate(['/home'])
          }
          }
        })
      }
    }
    async registro(){
      if(!this.formRegister.valid){
        this.notificacion.error("Tienes que rellenar todos los campos", "Registro")
      }else{
        this.iniciosesion.Registro(this.formRegister.controls['nombre'].value,this.formRegister.controls['email'].value,this.formRegister.controls['passwd'].value).subscribe(data=>{
          if(data.codigo === 1){
            this.notificacion.error("Ya existe un usuario con ese email", "Registro")
          }else{
            this.notificacion.success("Registrado correctamente, ya puedes iniciar sesion", "Registro")
            this.router.navigate(['/home'])
          }
        })
      }
    }

    cambioRegistro(){
      this.registrar = !this.registrar
    }

}

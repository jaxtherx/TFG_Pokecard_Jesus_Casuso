import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';
import { Producto } from '../../interfaces/producto';
import { ProductosService } from '../../servicios/productos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../interfaces/categoria';
import { LocalService } from '../../servicios/local.service';
import { Lusuario } from '../../interfaces/lusuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  imports: [Cabecera, Piepagina, ReactiveFormsModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaProductos {

  public productos = signal<Producto[]>([]);
  public categorias = signal<Categoria[]>([]);
  public serial = signal<number>(0);
  public usuario:any

  public productoForm: FormGroup;
  public selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private productosService: ProductosService, private local:LocalService, private router:Router) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoria_id: [''],
      idioma: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  enviarProducto() {
    if (this.productoForm.invalid || !this.selectedFile) return;

    const formData = new FormData();
    // Agregamos los campos del formulario
    Object.keys(this.productoForm.value).forEach(key => {
      formData.append(key, this.productoForm.value[key]);
    });
    // Agregamos la imagen (el backend la espera como 'imagen')
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost:3000/productos/crear', formData)
      .subscribe({
        next: (res) => console.log('Producto creado!', res),
        error: (err) => console.error('Error:', err),
        complete: () => this.listarProductos()
      });
  }

  ngOnInit():void{
   this.listarProductos()
   this.listarCategorias()
   this.usuario=this.local.recuperarUsuario()
   if(!this.usuario){
    this.router.navigate(['home'])
   }
   
  }

 listarProductos(){
  this.productosService.recuperarProductos().subscribe(res=>{
    this.productos.set(res)
  })
  }

  listarCategorias(){
    this.productosService.recuperarCategorias().subscribe(res=>{
      this.categorias.set(res)
    })
  }
  eliminarProducto(id:number){
    this.productosService.eliminarProducto(id).subscribe(res=>{
      this.listarProductos()
    })
  }
  editarProducto(){
    if (this.productoForm.invalid) return;
    
    const producto: Producto = {
      ...this.productoForm.value,
      id: this.serial(),
      ruta_imagen: '' // No se actualiza la imagen en este método
    };

    this.productosService.editarProducto(producto).subscribe(res=>{
      this.listarProductos()
    })
  }

  modalEditar(id:number){
    this.serial.set(id);
    const intent = this.productos().find(p => p.id === id);
    if(intent){
      this.productoForm.patchValue({
        nombre: intent.nombre,
        precio: intent.precio,
        stock: intent.stock,
        categoria_id: intent.categoria_id,
        idioma: intent.idioma,
        descripcion: intent.descripcion
      });
    }
  }

 }


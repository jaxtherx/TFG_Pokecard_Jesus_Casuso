import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';

@Component({
  selector: 'app-contacto',
  imports: [Cabecera, Piepagina],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacto { }

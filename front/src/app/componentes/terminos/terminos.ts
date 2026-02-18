import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';

@Component({
  selector: 'app-terminos',
  imports: [Cabecera, Piepagina],
  templateUrl: './terminos.html',
  styleUrl: './terminos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Terminos { }

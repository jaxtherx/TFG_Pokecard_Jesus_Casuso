import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';

@Component({
  selector: 'app-envio',
  imports: [Cabecera, Piepagina],
  templateUrl: './envio.html',
  styleUrl: './envio.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Envio { }

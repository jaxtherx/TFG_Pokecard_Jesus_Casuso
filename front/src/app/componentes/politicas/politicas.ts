import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';

@Component({
  selector: 'app-politicas',
  imports: [Cabecera, Piepagina],
  templateUrl: './politicas.html',
  styleUrl: './politicas.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Politicas { }

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cabecera } from '../cabecera/cabecera';
import { Piepagina } from '../piepagina/piepagina';

@Component({
  selector: 'app-reembolso',
  imports: [Cabecera, Piepagina],
  templateUrl: './reembolso.html',
  styleUrl: './reembolso.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reembolso { }

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cabecera } from "../cabecera/cabecera";
import { Piepagina} from "../piepagina/piepagina";

@Component({
  selector: 'app-sobrenosotros',
  imports: [Cabecera, Piepagina],
  templateUrl: './sobrenosotros.html',
  styleUrl: './sobrenosotros.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sobrenosotros { }

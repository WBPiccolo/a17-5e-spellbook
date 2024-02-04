import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-spell-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './spell-form.component.html',
  styleUrl: './spell-form.component.scss',

})
export class SpellFormComponent {
  @Input() spellForm: FormGroup = new FormGroup({});
  @Input() levels: number[] = [];
  @Input() schools: string[] = [];
  @Input() classes: string[] = [];
} 

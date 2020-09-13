import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormQuery } from '../state/form.query';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {

  result = this.query.getActive();
  keys = Object.keys(this.result).filter(key => !(key === 'name' || key === 'dob'));
  constructor(private query: FormQuery) { }

  ngOnInit(): void {
  }

}

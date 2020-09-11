import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-form-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['./dob.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DobComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

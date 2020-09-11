import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  profileForm = this.fb.group({
    name: [null],
    gender: [null],
    email: [null],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm.valueChanges.subscribe(console.log)
  }

}

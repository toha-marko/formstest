import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  profileForm = this.fb.group({
    name: ['FIO'],
    email: [''],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm.get('name').valueChanges.subscribe(console.log)
  }

}

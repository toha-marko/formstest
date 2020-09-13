import { SharedModule } from '@/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormQuery } from '../state/form.query';
import { FormService } from '../state/form.service';
import { PreviewRoutingModule } from './preview-routing.module';

import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PreviewRoutingModule,
        SharedModule],
      providers: [{ provide: FormQuery, useClass: MockQuery}],
      declarations: [PreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockQuery {
  getActive() {
    return {
      name: 'Name',
      dob: '12.12.1995',
      gender: { id: 0, value: 'male' },
      email: 'test@test.com'
    }
  }
}

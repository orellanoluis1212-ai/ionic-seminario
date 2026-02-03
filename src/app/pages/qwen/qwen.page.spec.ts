import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QwenPage } from './qwen.page';

describe('QwenPage', () => {
  let component: QwenPage;
  let fixture: ComponentFixture<QwenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QwenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

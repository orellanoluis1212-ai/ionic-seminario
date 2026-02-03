import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RmEpisodiosPage } from './rm-episodios.page';

describe('RmEpisodiosPage', () => {
  let component: RmEpisodiosPage;
  let fixture: ComponentFixture<RmEpisodiosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RmEpisodiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RmGraphqlPage } from './rm-graphql.page';

describe('RmGraphqlPage', () => {
  let component: RmGraphqlPage;
  let fixture: ComponentFixture<RmGraphqlPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RmGraphqlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

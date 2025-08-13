import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppletList } from './applet-list';

describe('AppletList', () => {
  let component: AppletList;
  let fixture: ComponentFixture<AppletList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppletList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppletList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

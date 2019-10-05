import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UshioComponent } from './ushio.component'

describe('UshioComponent', () => {
  let component: UshioComponent
  let fixture: ComponentFixture<UshioComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UshioComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UshioComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

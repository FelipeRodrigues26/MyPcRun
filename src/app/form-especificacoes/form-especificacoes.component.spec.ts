import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEspecificacoesComponent } from './form-especificacoes.component';

describe('FormEspecificacoesComponent', () => {
  let component: FormEspecificacoesComponent;
  let fixture: ComponentFixture<FormEspecificacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEspecificacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEspecificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

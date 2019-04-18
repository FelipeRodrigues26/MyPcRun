import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { startWith, map } from 'rxjs/operators';
import {trigger,state,style,animate,transition} from '@angular/animations';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-form-especificacoes',

  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        
      })),
      state('closed', style({
        opacity: 0.6,
        'margin-left':'-660px',
        width:'400px'
   
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],

  templateUrl: './form-especificacoes.component.html',
  styleUrls: ['./form-especificacoes.component.css'],
  providers: [NgbCarouselConfig]
})
export class FormEspecificacoesComponent implements OnInit {
  
  inscricaoItens:Subscription; 
  listaFiltrada:any[]=[];
  catSelecionada='escolha';
  images = ["pubg", "Apex","pes"].map((dado) => `assets/img/${dado}.png`);
  private itens:Item[]=[];
  private processadores:any[]=[];
  private placas:any[]=[];
  private memorias:any[]=[];
  private sos:any[]=[];

  processadorControl = new FormControl();
  placaControl = new FormControl();
  memoriaControl = new FormControl();
  soControl = new FormControl();
  itemControl = new FormControl();

  filteredItens: Observable<any[]>; 
  filteredProcessadores: Observable<any[]>;
  filteredPlacas: Observable<any[]>;
  filteredMemorias: Observable<any[]>;
  filteredSos: Observable<any[]>;



  constructor(config: NgbCarouselConfig,private db: AngularFireDatabase) {
    
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;

    this.inscricaoItens = this.getByCategoria(this.catSelecionada).subscribe(res => {
      this.itens = res;
    });
    this.getByCategoria('processadores').subscribe(res => {
      this.processadores = res;
    });
    this.getByCategoria('placas').subscribe(res => {
      this.placas = res;
    });
    this.getByCategoria('memorias').subscribe(res => {
      this.memorias = res;
    });
    this.getByCategoria('sos').subscribe(res => {
      this.sos = res;
    });

  }

  ngOnInit() {
    this.filteredItens = this.itemControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filter(nome) : this.itens.slice())
      );
  
    this.filteredProcessadores = this.processadorControl.valueChanges
    .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filter(nome) : this.processadores.slice())
    );

    this.filteredPlacas = this.placaControl.valueChanges
    .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filter(nome) : this.placas.slice())
    );
    this.filteredMemorias = this.memoriaControl.valueChanges
    .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filter(nome) : this.memorias.slice())
    );
    this.filteredSos = this.soControl.valueChanges
    .pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.nome),
      map(nome => nome ? this._filter(nome) : this.sos.slice())
    );
  }

  displayFn(item?:any): string | undefined {
    return item ? item.nome : undefined;
  }
  private _filter(value:string):any[]{
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.listaFiltrada.filter(dado => dado.nome.toLowerCase().includes(filterValue));
  }

  onChangeSelect(){
    console.log(this.catSelecionada);
      this.inscricaoItens.unsubscribe();
      this.inscricaoItens = this.getByCategoria(this.catSelecionada).subscribe(res => {
      this.itens = res;
    });
    this.filteredItens = this.itemControl.valueChanges
    .pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.nome),
      map(nome => nome ? this._filter(nome) : this.itens.slice())
    );
  }
  
  
  getByCategoria(categoria):any{
    return this.db.list(categoria)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
        
  }

  setComponenteFiltrado(lista){
    this.listaFiltrada=lista;
  }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
    this.viewResult = false;
  }
  viewResult;

  onViewResult() {
    this.viewResult = !this.viewResult;
  }


}

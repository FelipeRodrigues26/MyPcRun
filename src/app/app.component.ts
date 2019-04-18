import { Component } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database'
import { map, startWith } from 'rxjs/operators';
import { Item } from './Item';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  viewWelcome = true;
  private item: Item = new Item();
  catSelecionado='escolha';
  constructor(private db: AngularFireDatabase) {

  }

  ngOnInit() {

  }

  onSubmit() {
    this.salvar();
  }
  salvar() {
    console.log(this.item.genero, this.item.nome);
    this.db.list(this.catSelecionado).push(this.item)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  deletar(key: string) {
    this.db.object(`games/${key}`).remove();
  }


  onViewWelcome() {
    this.viewWelcome = false;
  }
}

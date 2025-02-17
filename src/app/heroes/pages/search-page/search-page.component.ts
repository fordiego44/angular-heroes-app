import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { tap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  constructor( private heroesService:HeroesService ){

  }

  searchInput = new FormControl('');

  public heroes: Hero[] = [];
  public selectedHero?: Hero;


  searchHero(): void{
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe( heroes => this.heroes = heroes );


  }

  onSelectedOption(event:MatAutocompleteSelectedEvent):void {
    console.log(event);

    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    console.log(event.option.value);

    const hero:Hero = event.option.value;
    console.log('aaa');

    console.log(hero);

    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }

}

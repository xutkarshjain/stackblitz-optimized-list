import { Input, Component, input, SimpleChanges, OnInit } from '@angular/core';
import { AppletList } from './applet-list/applet-list';
import { CategoryList } from './category-list/category-list';
import { SearchBar } from './search-bar/search-bar';
import { LibData } from './services/lib-data';
import { Applet } from './models/applet';
@Component({
  selector: 'app-library',
  imports: [AppletList, CategoryList, SearchBar],
  templateUrl: './library.html',
  styleUrl: './library.scss',
})
export class Library implements OnInit {
  @Input() data: { categories: string[]; applets: Applet[] } = {
    categories: [],
    applets: [],
  };
  constructor(private libData: LibData) {}
  ngOnInit(): void {
    this.libData.setLibData(this.data);
  }
}

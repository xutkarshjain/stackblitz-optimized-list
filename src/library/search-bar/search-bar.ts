import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LibData } from "../services/lib-data";
import { BehaviorSubject, debounceTime, distinctUntilChanged } from "rxjs";
@Component({
  selector: "app-search-bar",
  imports: [FormsModule],
  templateUrl: "./search-bar.html",
  styleUrl: "./search-bar.scss",
})
export class SearchBar {
  searchText = "";
  public search$ = new BehaviorSubject<string>("");

  constructor(private libData: LibData) {
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.onSearch();
      });
  }

  onSearch() {
    this.libData.filterAppletData(this.searchText.toLowerCase().trim());
  }

  onInputChange() {
    this.search$.next(this.searchText);
    console.log("Search text changed:", this.searchText);
  }
}

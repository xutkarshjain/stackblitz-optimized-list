import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Category } from "../models/category";
import { Applet } from "../models/applet";

@Injectable({
  providedIn: "root",
})
export class LibData {
  lib: { categories: string[]; applets: Applet[] } = {
    categories: [],
    applets: [],
  };

  filteredLibData: { categories: string[]; applets: Applet[] } = {
    categories: [],
    applets: [],
  };

  selectedCategorySubject = new BehaviorSubject<string>("");
  appletSearchTextSubject = new BehaviorSubject<string>("");
  reRenderSubject = new BehaviorSubject<boolean>(true);

  setLibData(libData: { categories: string[]; applets: Applet[] }) {
    this.lib = libData;
    this.filteredLibData = JSON.parse(JSON.stringify(this.lib));
  }

  filterAppletData(searchText: string) {
    this.appletSearchTextSubject.next(searchText);
    this.filteredLibData.applets = this.lib.applets.filter((applet: Applet) =>
      applet.name.toLowerCase().includes(searchText)
    );
    this.reRenderComponent();
  }

  reRenderComponent() {
    this.reRenderSubject.next(!this.reRenderSubject.getValue());
    return this.reRenderSubject.asObservable();
  }

  getSelectedCategory(): Observable<string> {
    return this.selectedCategorySubject.asObservable();
  }

  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }

  fetchCategoriesAndAppletCount() {
    let appletCounter = new Map();
    if (this.appletSearchTextSubject.getValue() == "") {
      appletCounter = new Map(
        this.lib.categories.map((category: String) => [category, 0])
      );
    }
    this.filteredLibData.applets.forEach((applet: Applet) => {
      applet.categories.forEach((category: string) => {
        appletCounter.set(category, (appletCounter.get(category) || 0) + 1);
      });
    });
    return of(
      Array.from(appletCounter, ([name, appletCount]) => ({
        name,
        appletCount,
      }))
    );
  }

  fetchAppletsByCategory(category: string) {
    let appltes: Applet[] = this.filteredLibData.applets.filter(
      (applet: Applet) => applet.categories.includes(category || "")
    );
    return of(appltes);
  }
}

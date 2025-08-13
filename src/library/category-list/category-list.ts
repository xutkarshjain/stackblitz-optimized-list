import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { LibData } from "../services/lib-data";
import { Category } from "../models/category";
import { ScrollingModule } from "@angular/cdk/scrolling";

@Component({
  selector: "app-category-list",
  imports: [ScrollingModule],
  templateUrl: "./category-list.html",
  styleUrl: "./category-list.scss",
})
export class CategoryList implements OnInit, AfterViewInit {
  constructor(private libData: LibData) {}
  @ViewChild("categoryListRef") categoryListRef!: ElementRef;

  categoryList: Category[] = [];
  selectedCategory: string = "";

  ngOnInit(): void {
    this.libData.reRenderComponent().subscribe((_) => {
      this.fetchCategoryData();
    });
  }

  ngAfterViewInit() {
    this.categoryListRef.nativeElement.addEventListener(
      "click",
      (event: Event) => {
        const target = event.target as HTMLElement;
        const categoryElement = target.closest(
          "[data-category]"
        ) as HTMLElement | null;

        if (categoryElement) {
          const categoryName = categoryElement.getAttribute("data-category")!;
          this.selectCategory(categoryName);
        }
      }
    );
  }

  fetchCategoryData() {
    this.libData.fetchCategoriesAndAppletCount().subscribe((data: any) => {
      this.categoryList = data;
      if (this.categoryList.length) {
        this.selectedCategory = this.categoryList[0]?.name || "";
      } else {
        this.selectedCategory = "";
      }
      this.libData.setSelectedCategory(this.selectedCategory);
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.libData.setSelectedCategory(this.selectedCategory);
  }
}

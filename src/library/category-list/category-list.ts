import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { LibData } from "../services/lib-data";
import { Category } from "../models/category";
import { ScrollingModule } from "@angular/cdk/scrolling";

@Component({
  selector: "app-category-list",
  imports: [ScrollingModule],
  templateUrl: "./category-list.html",
  styleUrls: ["./category-list.scss"],
})
export class CategoryList implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("categoryListRef") categoryListRef!: ElementRef;

  categoryList: Category[] = [];
  selectedCategory: string = "";

  private destroy$ = new Subject<void>();
  private clickHandler!: (event: Event) => void;

  constructor(private libData: LibData) {}

  ngOnInit(): void {
    this.libData
      .reRenderComponent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.fetchCategoryData();
      });
  }

  ngAfterViewInit() {
    this.clickHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      const categoryElement = target.closest(
        "[data-category]"
      ) as HTMLElement | null;

      if (categoryElement) {
        const categoryName = categoryElement.getAttribute("data-category")!;
        this.selectCategory(categoryName);
      }
    };

    this.categoryListRef.nativeElement.addEventListener(
      "click",
      this.clickHandler
    );
  }

  fetchCategoryData() {
    this.libData
      .fetchCategoriesAndAppletCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
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

  ngOnDestroy(): void {
    // Unsubscribe from observables
    this.destroy$.next();
    this.destroy$.complete();

    // Remove DOM event listener
    if (this.categoryListRef?.nativeElement && this.clickHandler) {
      this.categoryListRef.nativeElement.removeEventListener(
        "click",
        this.clickHandler
      );
    }
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { LibData } from "../services/lib-data";
import { Applet } from "../models/applet";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { Subject, switchMap, takeUntil } from "rxjs";

@Component({
  selector: "app-applet-list",
  imports: [ScrollingModule],
  templateUrl: "./applet-list.html",
  styleUrls: ["./applet-list.scss"],
})
export class AppletList implements OnInit, OnDestroy {
  appletList: Applet[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(public libData: LibData) {}

  ngOnInit(): void {
    this.libData
      .getSelectedCategory()
      .pipe(
        switchMap((selectedCategory: string) =>
          this.libData.fetchAppletsByCategory(selectedCategory)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((applets: Applet[]) => {
        this.appletList = applets;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

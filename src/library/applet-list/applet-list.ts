import { Component, OnInit } from "@angular/core";
import { LibData } from "../services/lib-data";
import { Applet } from "../models/applet";
import { ScrollingModule } from "@angular/cdk/scrolling";

@Component({
  selector: "app-applet-list",
  imports: [ScrollingModule],
  templateUrl: "./applet-list.html",
  styleUrl: "./applet-list.scss",
})
export class AppletList implements OnInit {
  constructor(public libData: LibData) {}
  appletList: Applet[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.libData.getSelectedCategory().subscribe((selectedCategory: string) => {
      this.libData
        .fetchAppletsByCategory(selectedCategory)
        .subscribe((applets: Applet[]) => {
          this.appletList = applets;
        });
    });
  }
}

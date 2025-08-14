import { Component, OnInit } from "@angular/core";
import { Library } from "../library/library";
import { addBigData } from "../utils/big-data";

@Component({
  selector: "app-root",
  imports: [Library],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  lib = {
    categories: ["Performance", "Investments", "Operations"],
    applets: [
      {
        name: "Performance Snapshot",
        categories: ["Performance"],
      },
      {
        name: "Commitment Widget",
        categories: ["Investments"],
      },
      {
        name: "CMS",
        categories: ["Investments", "Performance"],
      },
    ],
  };

  ngOnInit(): void {
    addBigData(this.lib, 50000, 100000);
  }
}

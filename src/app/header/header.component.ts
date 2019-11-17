import { DataStorageService } from "./../shared/data-storage.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() sendDisplay = new EventEmitter();
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {}

  onSelect(feature) {
    this.sendDisplay.emit(feature);
  }

  onSaveData() {
    this.dataStorage.storeRecipe();
  }
  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }
}

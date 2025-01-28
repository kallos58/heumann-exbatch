import { Component, OnInit, ViewChild } from '@angular/core';
import * as Cosmos from "@azure/cosmos";
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { SVGIcon, filePdfIcon, fileExcelIcon } from "@progress/kendo-svg-icons";
import { process } from "@progress/kendo-data-query";
import {
  GridModule,
  PDFModule,
  ExcelModule,
} from "@progress/kendo-angular-grid";
import { customers } from "../customers.js"

@Component({
  selector: 'app-batchrelease',
  imports: [ GridModule,
    PDFModule,
    ExcelModule],
  templateUrl: './batchrelease.component.html',
  styleUrl: './batchrelease.component.css'
})
export class BatchreleaseComponent implements OnInit{

  public gridData: unknown[] = customers;

  async ngOnInit(): Promise<void> {
    return;
    const endpoint = "https://schruefer.documents.azure.com:443/";
    const key = "ZE8r1ZNlJuL7o1F10F5NuPlJgJiC2TElldQycH2QCxIaZzkGcnxA5Za3URdElQM8ef66ctGmLNz1ACDbc9JuIA";
    const client = new Cosmos.CosmosClient({endpoint: endpoint, key: key});
    const db = client.database("Heumann");
    const container = db.container("Batch_Release");
    try {
      await container.items
      .query({
          query: "SELECT * from c"
      })
      .fetchAll()
      .then((response: any) => {
        this.gridData = response.resources;
        debugger;
      }) 
    } catch(error) {
      console.log(error);
    }    
  }

}

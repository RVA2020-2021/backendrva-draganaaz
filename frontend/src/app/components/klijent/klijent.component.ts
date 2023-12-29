import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/Klijent';
import { Kredit } from 'src/app/models/Kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'kredit', 'actions'];
  dataSource: MatTableDataSource<Klijent>;
  subscription: Subscription;
  selektovaniKlijent: Klijent;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private klijentService: KlijentService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.klijentService.getAllKlijents()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return key === 'kredit' ? currentTerm + data.kredit.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          if (property === 'kredit') {
            return data.kredit.naziv.toLocaleLowerCase();
          }
          return data[property];
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, (error: Error) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: number, kredit?: Kredit): void {
    const dialogRef = this.dialog.open(KlijentDialogComponent, { data: { id, ime, prezime, brojLk, kredit } });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe((res) => {
      // re-load data to update UI after changes
      if (res)
        this.loadData();
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public selectRow(row: any) {
    this.selektovaniKlijent = row;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

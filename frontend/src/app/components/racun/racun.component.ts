import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/Klijent';
import { Racun } from 'src/app/models/Racun';
import { TipRacuna } from 'src/app/models/TipRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnDestroy {
  @Input() selektovaniKlijent: Klijent;

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'tipRacuna', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  subscription: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private racunService: RacunService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.racunService.getRacunByKlijent(this.selektovaniKlijent.id)
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);

        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return key === 'tipRacuna' ? currentTerm + data.tipRacuna.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'tipRacuna': return data.tipRacuna.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => { console.log(error.name + ' ' + error.message) }
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: number, tipRacuna?: TipRacuna, klijent?: Klijent): void {
    const dialogRef = this.dialog.open(RacunDialogComponent, { data: { id, naziv, oznaka, opis, tipRacuna, klijent } });
    dialogRef.componentInstance.flag = flag;

    if (flag === 1) {
      dialogRef.componentInstance.dataDialog.klijent = this.selektovaniKlijent;
    }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

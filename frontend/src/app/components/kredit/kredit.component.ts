import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Kredit } from 'src/app/models/Kredit';
import { KreditService } from 'src/app/services/kredit.service';
import { KreditDialogComponent } from '../dialogs/kredit-dialog/kredit-dialog.component';

@Component({
  selector: 'app-kredit',
  templateUrl: './kredit.component.html',
  styleUrls: ['./kredit.component.css']
})
export class KreditComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource: MatTableDataSource<Kredit>;
  subscription: Subscription;

  constructor(private kreditService: KreditService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.kreditService.getAllKredits()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => { console.log(error.name, error.message) }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string): void {
    const dialogRef = this.dialog.open(KreditDialogComponent, { data: { id, naziv, oznaka, opis } });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe((res) => {
      // re-load data to update UI after changes
      if (res) {
        this.loadData();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

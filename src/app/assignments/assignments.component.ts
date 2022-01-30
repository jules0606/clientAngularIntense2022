import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {Router} from "@angular/router";
import {DateFromDDMMYYYY} from "../shared/date-utils";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  ajoutActive = false;
  assignments: Assignment[] = [];
  // pour la pagination
  page: number = 1;
  limit: number = 25;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  isRenduFilterChecked = false;
  filterNomDevoir: string = '';

  @ViewChild(MatTable, {static: false}) table?: MatTable<Assignment>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  public dataSource: MatTableDataSource<Assignment> = new MatTableDataSource<Assignment>();
  displayedColumns: string[] = ['auteur', 'nom', 'dateDeRendu', 'rendu'];

  constructor(private assignmentService: AssignmentsService, private router: Router) {}

  ngOnInit(): void {
    this.getAssignments();
   // this.dataSource.sort = this.sort;
    if(this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page.subscribe( change => {
        this.page = change.pageIndex + 1;
        this.limit = change.pageSize;
        this.getAssignments();
      });
    }
  }


  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit, this.isRenduFilterChecked, this.filterNomDevoir).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      this.assignments = data.docs;
      //on transform la Date en vrai format Date pour l'affichage
      console.log(data.docs);
      this.assignments.forEach(assign => {
        if(assign.dateDeRendu) {
          assign.dateDeRendu = DateFromDDMMYYYY(assign.dateDeRendu);
        }
      });
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      this.dataSource.data = this.assignments;
    });
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page = this.prevPage;
      this.getAssignments();
  }

  pageSuivante() {
      this.page = this.nextPage;
      this.getAssignments();
  }

  remplirBD() {
    //this.assignmentsService.peuplerBD();

    this.assignmentService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log('LA BASE EST ENTIEREMENT REMPLIE AVEC LES DONNEES DE TEST');

      // replaceUrl = true = force le refresh, même si
      // on est déjà sur la page d’accueil
      this.router.navigate(['/assignments'], { replaceUrl: true });
    });
  }

  goToAssignment(row: Assignment) {
    this.router.navigate(['/assignment/' + row._id], { replaceUrl: true });
  }

  RequestFilterDevoirRendu($event: MatCheckboxChange) {
    this.isRenduFilterChecked = $event.checked;
    this.getAssignments();
  }

  RequestFilterChampsNom() {
    this.getAssignments();
  }
}

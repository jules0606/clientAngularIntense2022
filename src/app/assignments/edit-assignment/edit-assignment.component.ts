import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import {Assignment, Matiere} from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatiereService} from "../../shared/matiere.service";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment?:Assignment;
  // champs du formulaire
  editFormGroup: FormGroup;
  public matieres?: Matiere[];

  @ViewChild('selection') select?: MatSelect;

  constructor(private route:ActivatedRoute, private matiereService: MatiereService,
              private router:Router, private formBuilder: FormBuilder,
              private assignmentService:AssignmentsService) {
    this.editFormGroup = this.formBuilder.group( {
      nomDevoir: '',
      dateDeRendu: '',
      nomAuteur: '',
      matiere: '',
      note: '',
      remarques: ''
    });
    this.editFormGroup.get('nomDevoir')?.setValidators(Validators.required);
    this.editFormGroup.get('dateDeRendu')?.setValidators(Validators.required);
    this.editFormGroup.get('nomAuteur')?.setValidators(Validators.required);
    this.editFormGroup.get('matiere')?.setValidators(Validators.required);
    this.editFormGroup.get('note')?.setValidators([Validators.required, Validators.maxLength(2)]);
  }

  ngOnInit(): void {
    // exemple de récupération de "query params" et "fragment"
    // exemple d'URL : /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    this.matiereService.getMatieres().subscribe( mats => {
      this.matieres = mats;
      this.getAssignment();
    });
  }

  getAssignment() {
    // récupère l'id dans l'URL
    const id = this.route.snapshot.params['id'];

    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      // Pour que la "vue" affiche les informations
      // de l'assignment qu'on édite....
      this.assignment = assignment;
      // pré-remplit le formulaire dès l'affichage
      this.editFormGroup.setValue({
        nomDevoir: assignment?.nom || null,
        dateDeRendu: assignment?.dateDeRendu || null,
        nomAuteur : assignment?.auteur || null,
        matiere : assignment?.matiere || null,
        note : assignment?.note || null,
        remarques : assignment?.remarques || null,
      });
    })
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    this.assignment.nom = this.editFormGroup.value.nom;
    this.assignment.dateDeRendu = this.editFormGroup.value.dateDeRendu;
    this.assignment.auteur = this.editFormGroup.value.nomAuteur;
    this.assignment.matiere = this.editFormGroup.value.matiere;
    this.assignment.note = this.editFormGroup.value.note;
    this.assignment.remarques = this.editFormGroup.value.remarques;
    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/assignment/' + this.assignment?._id]);
      });


  }
 }

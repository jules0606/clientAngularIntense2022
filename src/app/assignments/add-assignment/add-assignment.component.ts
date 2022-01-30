import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import {Assignment, Matiere} from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatiereService} from "../../shared/matiere.service";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  public formAddAssignment: FormGroup;
  public matieres?: Matiere[];

  constructor(private assignmentService:AssignmentsService, private matiereService: MatiereService,
    private router:Router, private formBuilder: FormBuilder) {
    this.formAddAssignment = this.formBuilder.group( {
      nomDevoir: '',
      dateDeRendu: '',
      nomAuteur: '',
      matiere: '',
      remarques: ''
    });
    this.formAddAssignment.get('nomDevoir')?.setValidators(Validators.required);
    this.formAddAssignment.get('dateDeRendu')?.setValidators(Validators.required);
    this.formAddAssignment.get('nomAuteur')?.setValidators(Validators.required);
    this.formAddAssignment.get('matiere')?.setValidators(Validators.required);
  }

  ngOnInit(): void {
    this.matiereService.getMatieres().subscribe( matieres => {
      this.matieres = matieres;
    })
  }

  onSubmit() {
    console.log("NOM = " + this.formAddAssignment.value.nomDevoir);
    console.log("DATE = " + this.formAddAssignment.value.dateDeRendu);

    const newAssignment = new Assignment();
    newAssignment.nom = this.formAddAssignment.value.nomDevoir;
    newAssignment.auteur = this.formAddAssignment.value.nomAuteur;
    newAssignment.dateDeRendu = this.formAddAssignment.value.dateDeRendu;
    newAssignment.matiere = this.formAddAssignment.value.matiere;
    newAssignment.remarques = this.formAddAssignment.value.remarques;
    newAssignment.rendu = false;

    this.assignmentService.addAssignment(newAssignment)
    .subscribe(reponse => {
      console.log(reponse);
      this.router.navigate(["/assignment/" + reponse._id]);
    });
  }
}

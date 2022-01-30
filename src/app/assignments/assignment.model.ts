export class Matiere {
  nom!: string;
  urlPhotoProf!: string;
  urlImageMatiere!: string;
}

export class Assignment {
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
  _id?:string;
  auteur!: String;
  matiere?: Matiere;
  note!: Number;
  remarques!: String;
}

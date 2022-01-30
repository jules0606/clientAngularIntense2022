import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Matiere} from "../assignments/assignment.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MatiereService {

  url = "https://jules0606_api_2022.herokuapp.com/api/matieres";

  constructor(private http:HttpClient) { }

  public getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }
}

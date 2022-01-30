import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Matiere} from "../assignments/assignment.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MatiereService {

  url = "http://localhost:8010/api/matieres";

  constructor(private http:HttpClient) { }

  public getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Candidate } from '../model/Candidate';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient: HttpClient) { }

  addCandidate(candidateInfo){
    return this.httpClient.post<Candidate>(`${environment.BASE_URL}/candidates/invite`,candidateInfo);
  }

  getCandidates(){
    return this.httpClient.get<Candidate[]>(`${environment.BASE_URL}/candidates`);
  }

  getCandidateById(id) {
    return this.httpClient.get<Candidate>(`${environment.BASE_URL}/candidates/${id}`);
  }
}

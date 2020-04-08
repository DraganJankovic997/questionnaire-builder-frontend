import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';
import { RoleEnum } from 'src/app/enumerator/roleEnum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getInterviewers(){
    return this.httpClient.get<User[]>(`${environment.BASE_URL}/getInterviewers`);
  }

  addInterviewer(userInfo){
    userInfo.role = {
      id: 2,
      name: RoleEnum.INTERVIEWER
    }
    return this.httpClient.post<User>(`${environment.BASE_URL}/auth/sign-up`,userInfo);
  }

  addHr(user){
    user.role= {
      id: 1,
      name: RoleEnum.HR
    }
    return this.httpClient.post<User>(`${environment.BASE_URL}/auth/sign-up`,user);
  }
}

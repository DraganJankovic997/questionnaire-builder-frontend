import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddInterviewerFormComponent } from 'src/app/components/forms/add-interviewer-form/add-interviewer-form.component';
import { DisplayTestsForInterviewersComponent } from '../display-tests-for-interviewers/display-tests-for-interviewers.component';


@Component({
  selector: 'app-display-interviewers',
  templateUrl: './display-interviewers.component.html',
  styleUrls: ['./display-interviewers.component.css']
})
export class DisplayInterviewersComponent implements OnInit {
  interviewers: User[] = [];
  searchText:string;
  page:number=1;
  pageSize:number=10;

  constructor(private userService: UserService,public modalService: NgbModal) { }

  ngOnInit(): void {
    this.getInterviewers();
  }
  open(){
    this.modalService.open(AddInterviewerFormComponent).result.then(()=>{
      this.getInterviewers();
    });
  }
  openInterviewerModal(interviewer){
    
    const modalRef = this.modalService.open(DisplayTestsForInterviewersComponent,{size: 'lg'});
    modalRef.componentInstance.user = interviewer;
  }
  getInterviewers(){
      this.userService.getInterviewers().subscribe((res)=>{
        this.interviewers=res;
      });
  }
}

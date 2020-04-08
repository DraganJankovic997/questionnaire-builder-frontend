import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/model/Candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { SurnameSortPipe } from 'src/app/pipes/surname-sort.pipe';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddCandidateFormComponent } from 'src/app/components/forms/add-candidate-form/add-candidate-form.component';
import { InviteCandidateFormComponent } from 'src/app/components/forms/invite-candidate-form/invite-candidate-form.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-display-candidates',
  templateUrl: './display-candidates.component.html',
  styleUrls: ['./display-candidates.component.css']
})
export class DisplayCandidatesComponent implements OnInit {
  candidates: Candidate[] = [];
  searchText: string;
  page:number=1;
  pageSize:number=10;
  constructor(private candidateService: CandidateService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getCandidates();
  }
  open(){
    this.modalService.open(AddCandidateFormComponent).result.then(()=>{
      this.getCandidates();
    });
  }
  openInvite(cand: Candidate){
    const modalRef = this.modalService.open(InviteCandidateFormComponent);
    modalRef.componentInstance.candidate = cand;
  }
  getCandidates(){
    this.candidateService.getCandidates().subscribe((res)=>{
      this.candidates=res;
    });
  }
  toProfile(id) {
    this.router.navigate([`candidate/${id}`]);
  }
}

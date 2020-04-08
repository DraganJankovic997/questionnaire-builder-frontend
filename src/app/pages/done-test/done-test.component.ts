import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/model/Test';
import { ToastrService } from 'ngx-toastr';
import { StatusEnum } from '../../enumerator/statusEnum';

@Component({
  selector: 'app-done-test',
  templateUrl: './done-test.component.html',
  styleUrls: ['./done-test.component.css']
})
export class DoneTestComponent implements OnInit {

  test: Test = null;
  max: number = 0;
  points: number = 0;
  percent;
  statuses = StatusEnum;
  constructor(private testService: TestService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTest(this.route.snapshot.paramMap.get("id"));
  }

  getTest(id){
    this.testService.getTestById(id).subscribe((res) => {
      this.test = res;
      res.answers.forEach((ans) => {
        this.max = this.max + 1;
        this.points = this.points + ans.score
      });
      this.percent = (this.points/this.max * 100).toFixed(0);
    }, (err) => {
      this.toastr.show(err.message, "Test unavailable :(");
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-us-public',
  templateUrl: './us-public.component.html',
  styleUrls: ['./us-public.component.scss']
})
export class UsPublicComponent implements OnInit {
  showInfographic: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleNestReports() {
    this.showInfographic = !this.showInfographic;
  }

}

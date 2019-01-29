import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToInfographic() {
    this.router.navigate(['/infographic']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpawnPointsService } from '../spawnpoints.service';
import { SpawnPoint } from '../models/spawn-point';

@Component({
  selector: 'app-sp-crud',
  templateUrl: './sp-crud.component.html',
  styleUrls: ['./sp-crud.component.css']
})
export class SpCrudComponent implements OnInit {
  form: FormGroup;
  name: string;
  attributes: string;
  lat: number;
  long: number;
  link: URL;

  constructor(private fb: FormBuilder, private spService: SpawnPointsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.name, Validators.required],
      attributes: [this.attributes],
      link: [this.link, Validators.required],
      lat: [this.lat],
      long: [this.long],
    });
  }

  savePoint(event) {
    if (this.form.valid) {
      const { name, attributes, lat, long, link } = this.form.value;

      this.spService.newSpawnPoint(new SpawnPoint(
        name, attributes, lat, long, link
      ));
    } else {
      console.log('form invalid');
    }
  }
}

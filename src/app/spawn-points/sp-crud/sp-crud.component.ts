import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpawnPointsService } from '../spawnpoints.service';
import { SpawnPoint } from '../models/spawn-point';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-sp-crud',
  templateUrl: './sp-crud.component.html',
  styleUrls: ['./sp-crud.component.css']
})
export class SpCrudComponent implements OnInit {
  form: FormGroup;
  name: string = '';
  attributes: string = '';
  lat: number;
  long: number;
  link: URL = null;
  nestId: string = '';
  paramPoint: SpawnPoint;

  constructor(private fb: FormBuilder, private spService: SpawnPointsService, private messageService: MessageService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.name, Validators.required],
      attributes: [this.attributes],
      link: [this.link, Validators.required],
      lat: [this.lat],
      long: [this.long],
      nestId: [this.nestId]
    });

    let pointId = this.route.snapshot.paramMap.get('pointId');

    if (pointId) {
      this.spService.getSpawnPoint(pointId).then(point => {
        this.paramPoint = point;

        this.form.setValue({
          name: point.name,
          attributes: point.attributes || '',
          link: point.link,
          lat: point.lat || '',
          long: point.long || '',
          nestId: point.nestId || ''
        });
      });
    }
  }

  savePoint(event) {
    if (this.form.valid) {
      const { name, attributes, lat, long, link, nestId } = this.form.value;

      if (this.paramPoint) {
        this.spService.editSpawnPoint(this.paramPoint.pointId, this.form.value, this.messageService);

        window.setTimeout(() => {
          this.router.navigate(['points']);
        }, 2500)
      } else {
        // New Point
        this.spService.newSpawnPoint(new SpawnPoint(
          name, attributes, lat, long, link, nestId
        ), this.messageService);

        this.clearPointForm();
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Chequea que los campos con (*) hayan sido rellenados.' });
    }
  }

  clearPointForm() {
    this.form.reset();
  }

  backToList() {
    window.history.back();
  }
}

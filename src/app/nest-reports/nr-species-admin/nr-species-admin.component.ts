import { Component, OnInit } from '@angular/core';
import { NestingSpecies } from '../models/nesting-species';
import { NestingSpeciesService } from '../nesting-species.service';
import { ActivatedRoute } from '@angular/router';
import { sortAsc } from 'src/app/utils/utils';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nr-species-admin',
  templateUrl: './nr-species-admin.component.html',
  styleUrls: ['./nr-species-admin.component.scss']
})
export class NrSpeciesAdminComponent implements OnInit {
  title = 'Administrar especies que anidan';
  nestingSpecies: NestingSpecies[];
  generationKeys = {
    'Kanto': 151,
    'Johto': 251,
    'Hoenn': 386,
    'Sinnoh': 493
  };
  speciesByGeneration: Array<NestingSpecies[]> = [];

  constructor(private nestingSpeciesService: NestingSpeciesService, private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    const nestingSpecies = this.route.snapshot.data['nestingSpecies'];

    if (nestingSpecies) {
      this.nestingSpecies = nestingSpecies;
      this.groupSpeciesByGeneration();
    } else {
      this.nestingSpeciesService.getAllSpecies().subscribe(species => {
        this.nestingSpecies = species;
        this.groupSpeciesByGeneration();
      });
    }
  }

  groupSpeciesByGeneration() {
    const allSpecies = Array.from(this.nestingSpecies).sort(sortAsc('id'));
    
    let lastThreshold = 0;
    for (const threshold of Object.keys(this.generationKeys)) {
      if (lastThreshold < this.generationKeys[threshold]) {
        this.speciesByGeneration.push(allSpecies.slice(lastThreshold, this.generationKeys[threshold]));
        lastThreshold = this.generationKeys[threshold];
      }
    }
  }

  get generations() {
    return Array.from(Object.keys(this.generationKeys));
  }

  toggleNesting($event, species: NestingSpecies) {
    this.nestingSpeciesService.toggleNestingSpecies(species.id, $event.checked, this.messageService).subscribe(result => {

    });
  }
}

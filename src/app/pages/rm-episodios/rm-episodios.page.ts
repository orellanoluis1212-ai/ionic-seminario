import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RickMortyGqlService, GqlResponse  } from 'src/app/services/rickandmorty-gql.service';

type EpisodesCard = {
  id: string;
  name: string;
  air_date: string;
  episode: string;
};

type EpisodesQueryData = {
  episodes: { results: EpisodesCard[] };
};


type EpisodeDetail = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
  }[];

};

type EpisodeDetailQueryData = {
  episode: EpisodeDetail | null;
};

const GET_EPISODES_LIST = `
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`;

const GET_EPISODE_WITH_CHARACTERS = `
  query GetEpisodeWithCharacters($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        status
        species
        image
      }
    }
  }
`;

@Component({
  selector: 'app-rm-episodios',
  standalone: true,
  templateUrl: './rm-episodios.page.html',
  styleUrls: ['./rm-episodios.page.scss'],
  imports: [CommonModule, IonicModule, ]
})

export class RmEpisodiosPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  loadingList = true;
  loadingDetail = false;
  loadingResidents = false;

  errorMsg = '';

  episodes: EpisodesCard[] = [];
  selected: EpisodeDetail | null = null;

  isModalOpen = false;

  constructor(private gql: RickMortyGqlService) { }

  ngOnInit(): void {
    this.gql
      .query<EpisodesQueryData>(GET_EPISODES_LIST, { page: 1 })
      .pipe(finalize(() => (this.loadingList = false)))
      .subscribe({
        next: (res: GqlResponse<EpisodesQueryData>) => {
          this.episodes = res.data?.episodes?.results ?? [];
        },
        error: () => (this.errorMsg = 'Error cargando personajes'),
      });
  }

  openDetail(id: string) {
    this.isModalOpen = true;
    this.selected = null;
    this.loadingDetail = true;

    this.gql
      .query<EpisodeDetailQueryData>(GET_EPISODE_WITH_CHARACTERS, { id })
      .pipe(finalize(() => (this.loadingDetail = false)))
      .subscribe({
        next: (res) => {
          this.selected = res.data?.episode ?? null;
        },
        error: () => (this.errorMsg = 'Error cargando detalle'),
      });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selected = null;
    this.loadingDetail = false;
    this.loadingResidents = false;
  }

  trackById(_: number, e: EpisodesCard) {
    return e.id;
  }
}

import { SearchItemResponseDtoV1 } from '../services/search/dtos/responses/search.response.dto.v1';

export enum SearchItemType {
  Team = 'team',
  Athlete = 'athlete',
}
export interface SearchItem {
  type: SearchItemType;
  id: number;
  imgSrc: string;
  title: string;
  subtitle: string;
  searchMatch: {
    finalScore: number;
    popularityScore: number;
    similarityScore: number;
  };
}

export class SearchItemFactory {
  static fromDtoV1(dto: SearchItemResponseDtoV1): SearchItem {
    const searchItemType = Object.values(SearchItemType).find(
      (type) => type === dto.entity_type
    );
    if (searchItemType === undefined) {
      throw new Error(
        `Invalid search item type: ${
          dto.entity_type
        }. \nFull item response: ${JSON.stringify(dto)}`
      );
    }

    return {
      type: searchItemType,
      id: dto.id,
      imgSrc: dto.display_img_src,
      title: dto.display_title,
      subtitle: dto.display_subtitle,
      searchMatch: {
        finalScore: dto.final_score,
        popularityScore: dto.popularity_score,
        similarityScore: dto.similarity_score,
      },
    };
  }
}

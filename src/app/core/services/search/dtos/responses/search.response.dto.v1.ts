export interface SearchItemResponseDtoV1 {
  entity_type: string;
  id: number;
  display_title: string;
  display_subtitle: string;
  display_img_src: string;
  popularity_score: number;
  similarity_score: number;
  final_score: number;
}

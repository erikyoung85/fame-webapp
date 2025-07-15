export const profileAthleteRaffleSummarySelectStr = `profile_id, total_raffles_created, total_raffles_completed, total_tickets_sold`;

export interface ProfileAthleteRaffleSummaryResponseDtoV1 {
  profile_id: string | null;
  total_raffles_created: number | null;
  total_raffles_completed: number | null;
  total_tickets_sold: number | null;
}

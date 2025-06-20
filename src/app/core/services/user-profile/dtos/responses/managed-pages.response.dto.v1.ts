export interface ManagedPagesResponseDtoV1 {
  athletes: {
    id: number;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  }[];
  teams: {
    id: number;
    name: string;
    avatar_url: string | null;
  }[];
}

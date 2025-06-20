export interface RapidApiResponseDtoV1<T> {
  data: T[];
  links: [
    {
      rel: 'first';
      href: string;
    },
    {
      rel: 'next';
      href: string;
    },
    {
      rel: 'last';
      href: string;
    }
  ];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}

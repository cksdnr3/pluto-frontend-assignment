export interface ISearchParams {
  query?: string;
  hitsPerPage?: number;
  page?: number;
  tags?: TTags;
  restrictSearchableAttributes?: "url" | "title";
}

type TTags = "story" | "comment" | "poll";

export interface ISearch {
  objectID: string;
  title: string;
  author: string;
  points: number;
}

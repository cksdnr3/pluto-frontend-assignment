export interface IPost {
  id: number;
  title: string;
  author: string;
  points: number;
  url: string;
  children: Comment[];
}

export interface Comment {
  text: string;
}

type genres = {
  name: string;
};

export interface AnimeData {
  mal_id: number;
  title_english: string;
  genres: genres[];
  score: number;
  synopsis: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export interface ReviewData {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  bookId: number;
}

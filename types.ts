export type BookStatus = 'Available' | 'Checked Out' | 'On Hold';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
  publicationYear: string;
}

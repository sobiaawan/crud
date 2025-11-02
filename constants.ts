import type { Book, BookStatus } from './types';

export const BOOK_STATUSES: BookStatus[] = ['Available', 'Checked Out', 'On Hold'];

export const sampleBooks: Book[] = [
  {
    id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    status: 'Available',
    publicationYear: '1925',
  },
  {
    id: 'book-2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    status: 'Checked Out',
    publicationYear: '1960',
  },
  {
    id: 'book-3',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    status: 'Available',
    publicationYear: '1949',
  },
  {
    id: 'book-4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    status: 'On Hold',
    publicationYear: '1937',
  },
    {
    id: 'book-5',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    status: 'Available',
    publicationYear: '1965',
  },
];

import React, { useState, useMemo } from 'react';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { Modal } from './components/Modal';
import { BookForm } from './components/TaskForm'; // Renamed TaskForm to BookForm internally
import { Book } from './types';
import { sampleBooks } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBook = () => {
    setCurrentBook(null);
    setIsFormModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
    setIsFormModalOpen(true);
  };

  const handleDeleteRequest = (book: Book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter(book => book.id !== bookToDelete.id));
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  const handleSubmit = (bookData: Omit<Book, 'id'>) => {
    if (currentBook) {
      // Update book
      setBooks(books.map(book => 
        book.id === currentBook.id ? { ...book, ...bookData } : book
      ));
    } else {
      // Add new book
      const newBook: Book = {
        id: crypto.randomUUID(),
        ...bookData,
      };
      setBooks([newBook, ...books]);
    }
    setIsFormModalOpen(false);
    setCurrentBook(null);
  };

  const filteredBooks = useMemo(() => {
    return books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  const handleGoToDashboard = () => setView('dashboard');
  const handleGoHome = () => setView('landing');

  if (view === 'landing') {
    return <LandingPage onGoToDashboard={handleGoToDashboard} />;
  }

  return (
    <div className="min-h-screen text-slate-800">
      <header className="bg-primary shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">💖 Lovely Library Dashboard</h1>
          <button 
            onClick={handleGoHome}
            className="text-white font-semibold hover:bg-accent hover:text-slate-900 px-3 py-1 rounded-md transition-colors"
          >
            Home
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Dashboard
          books={filteredBooks}
          onAddBook={handleAddBook}
          onEditBook={handleEditBook}
          onDeleteBook={handleDeleteRequest}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </main>

      {/* Form Modal for Add/Edit */}
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={currentBook ? 'Edit Book' : 'Add New Book'}>
        <BookForm 
          onSubmit={handleSubmit} 
          initialData={currentBook} 
          onCancel={() => setIsFormModalOpen(false)} 
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="p-4">
          <p className="text-secondary text-lg">Are you sure you want to delete the book "{bookToDelete?.title}"?</p>
          <p className="text-sm text-slate-500 mt-2">This action cannot be undone.</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
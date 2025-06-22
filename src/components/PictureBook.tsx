import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { bookPages, BookPage } from '../data/bookData';

const PictureBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentPageData: BookPage = bookPages[currentPage];

  useEffect(() => {
    setImageLoaded(false);
    setIsLoading(true);
  }, [currentPage]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
  };

  const goToNextPage = () => {
    if (currentPage < bookPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header with Title and Page Indicator */}
      <header className="p-4 text-center relative z-10">
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="text-yellow-300 mr-2 h-6 w-6" />
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif">
            Prisha's Magical Mystery Package
          </h1>
          <Sparkles className="text-yellow-300 ml-2 h-6 w-6" />
        </div>
        
        {/* Author Information */}
        <div className="text-white/90 text-sm mb-2 font-medium">
          By MiniMax Agent
        </div>
        
        {/* Page Counter */}
        <div className="text-white/80 text-sm">
          Page {currentPage} of {bookPages.length - 1}
          {currentPage === 0 && " (Cover)"}
        </div>
      </header>

      {/* Main Book Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 space-y-4">
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Image Container - NO TEXT OVERLAY */}
          <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden mb-6">
            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            )}

            {/* Page Image - Full Display Without Text Overlay */}
            <div className="relative w-full">
              <img
                src={currentPageData.image}
                alt={`Page ${currentPage} - ${currentPageData.isCover ? 'Cover' : 'Story page'}`}
                className={`w-full h-auto object-contain transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } ${currentPageData.isCover ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                onLoad={handleImageLoad}
                onError={() => {
                  console.error(`Failed to load image: ${currentPageData.image}`);
                  setIsLoading(false);
                }}
              />
            </div>

            {/* Navigation Arrows on Image */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-80 hover:opacity-100 hover:bg-white/30 active:scale-95'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={goToNextPage}
              disabled={currentPage === bookPages.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 ${
                currentPage === bookPages.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-80 hover:opacity-100 hover:bg-white/30 active:scale-95'
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Text Container - COMPLETELY SEPARATE FROM IMAGE */}
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20">
            <div className="text-center">
              {currentPageData.isCover ? (
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif leading-tight drop-shadow-lg">
                    {currentPageData.text}
                  </h2>
                  {currentPageData.author && (
                    <p className="text-xl md:text-2xl text-yellow-300 font-medium drop-shadow-md">
                      {currentPageData.author}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-medium drop-shadow-md max-w-4xl mx-auto">
                  {currentPageData.text}
                </p>
              )}
            </div>
          </div>

          {/* Page Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2 overflow-x-auto py-2">
            {bookPages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentPage
                    ? 'bg-yellow-300 scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to page ${index}`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-4 flex justify-center space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
            currentPage === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white active:scale-95 shadow-lg'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={goToNextPage}
          disabled={currentPage === bookPages.length - 1}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
            currentPage === bookPages.length - 1
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white active:scale-95 shadow-lg'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>

      {/* Author Credit in Footer */}
      <div className="text-center text-white/60 text-sm pb-2">
        Created by MiniMax Agent
      </div>

      {/* Magical Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default PictureBook;

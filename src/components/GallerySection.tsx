import { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Artistry' },
    { id: 'hair', label: 'Hair' },
    { id: 'skin', label: 'Facial & Skin' },
    { id: 'makeup', label: 'Makeup' },
    { id: 'nails', label: 'Nails' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'interior', label: 'Sanctuary' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <>
      <section id="gallery" className="py-24 lg:py-36 bg-[#F7F4EE] border-t border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 pb-6 border-b border-[#E8E0D4] gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-[#B7A17A]" />
                <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-[#7A7265]">
                  VISUAL ARCHIVE
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1C1A] tracking-tight">
                The Gallery
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1C1C1A] text-[#F7F4EE]'
                      : 'bg-[#FAF8F5] text-[#7A7265] border border-[#E8E0D4] hover:border-[#1C1C1A] hover:text-[#1C1C1A]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="group relative bg-[#FAF8F5] border border-[#E8E0D4] p-2 overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(28,28,26,0.02)] hover:shadow-[0_12px_36px_rgba(28,28,26,0.06)] transition-all duration-500"
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#E8E0D4]/30 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />
                  {/* Subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-[#1C1C1A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="w-full bg-[#F7F4EE]/95 backdrop-blur-xs p-3 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#B7A17A] block font-mono">
                          {item.category}
                        </span>
                        <span className="font-serif text-sm text-[#1C1C1A] block">
                          {item.title}
                        </span>
                      </div>
                      <Maximize2 className="w-3.5 h-3.5 text-[#1C1C1A]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-8">
          <div
            className="fixed inset-0 bg-[#1C1C1A]/90 backdrop-blur-sm"
            onClick={() => setLightboxItem(null)}
          />

          <div className="relative max-w-4xl w-full bg-[#F7F4EE] border border-[#E8E0D4] p-4 sm:p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D4]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B7A17A] font-medium font-mono">
                  {lightboxItem.category}
                </span>
                <h3 className="font-serif text-2xl text-[#1C1C1A]">{lightboxItem.title}</h3>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-2 text-[#1C1C1A] hover:text-[#B7A17A] cursor-pointer rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-[#E8E0D4]/20 border border-[#E8E0D4]">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {lightboxItem.description && (
              <p className="text-xs text-[#5E584F] font-light text-center">
                {lightboxItem.description}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

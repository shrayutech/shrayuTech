"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, ArrowRight, X } from 'lucide-react';
import { searchLocations } from '../../utils/locationUtils';

export default function LocationSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      const found = searchLocations(val);
      setResults(found);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (url) => {
    setIsOpen(false);
    setQuery('');
    startTransition(() => {
      router.push(url);
    });
  };

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div
        className={`relative flex items-center rounded-2xl border transition-all duration-300 shadow-lg ${
          'light:bg-white light:border-slate-200 light:focus-within:border-blue-500/60 light:focus-within:shadow-blue-500/10 dark:bg-white/5 dark:border-white/15 dark:focus-within:border-blue-500/60 dark:focus-within:bg-white/10'
        }`}
      >
        <Search className="w-5 h-5 ml-4 shrink-0 text-blue-500" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by city, state, or tech corridor (e.g. Sambhajinagar, CIDCO, Waluj)..."
          className={`w-full py-4 px-3 text-sm font-medium bg-transparent outline-none transition-colors ${
            'light:text-slate-900 light:placeholder:text-slate-500 dark:text-white dark:placeholder:text-slate-400'
          }`}
          onFocus={() => {
            if (query.trim().length > 1) setIsOpen(true);
          }}
        />
        {query && (
          <button
            onClick={clearQuery}
            className="p-2 mr-2 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-full rounded-2xl border backdrop-blur-xl shadow-2xl z-50 overflow-hidden transition-all duration-200 ${
            'light:bg-white/95 light:border-slate-200 light:divide-y light:divide-slate-100 dark:bg-slate-900/95 dark:border-white/15 dark:divide-y dark:divide-white/10'
          }`}
        >
          {results.length > 0 ? (
            <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Matching Engineering Hubs ({results.length})
              </div>
              {results.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.url)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors group ${
                    'light:hover:bg-slate-50 light:text-slate-900 dark:hover:bg-white/10 dark:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        'light:bg-blue-50 light:text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                      }`}
                    >
                      {item.type === 'state' ? (
                        <Building className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.city?.isHeadquarters && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                            HQ
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center space-y-2">
              <p className={`text-xs font-semibold ${'light:text-slate-600 dark:text-slate-300'}`}>
                No specific delivery hub matched "{query}"
              </p>
              <p className="text-[11px] text-slate-400">
                Try searching for <strong>Sambhajinagar</strong>, <strong>Aurangabad</strong>, or <strong>Maharashtra</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


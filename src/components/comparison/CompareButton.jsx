"use client";

import React from 'react';
import { Plus, Check, ArrowRightLeft } from 'lucide-react';
import { useComparison } from '../../context/ComparisonContext.jsx';

export default function CompareButton({
  type = 'systems',
  item,
  variant = 'compact', // 'compact' | 'full'
  className = ''
}) {
  const { isInComparison, addItem, removeItem, isHydrated } = useComparison();

  if (!item || !isHydrated) return null;

  const itemId = item.id || item.slug;
  const isSelected = isInComparison(type, itemId);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelected) {
      removeItem(type, itemId);
    } else {
      addItem(type, item);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleToggle}
        aria-label={isSelected ? `Remove ${item.name || item.title} from comparison` : `Add ${item.name || item.title} to compare`}
        title={isSelected ? 'In comparison (click to remove)' : 'Add to compare'}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
          isSelected
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
            : 'light:bg-slate-100 light:hover:bg-slate-200 light:text-slate-700 light:hover:text-slate-900 light:border light:border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:hover:text-white dark:border dark:border-white/10'
        } ${className}`}
      >
        {isSelected ? (
          <>
            <Check className="w-3 h-3 text-white" />
            <span>Added</span>
          </>
        ) : (
          <>
            <ArrowRightLeft className="w-3 h-3 text-blue-400" />
            <span>Compare</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
        isSelected
          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'
          : 'light:bg-slate-100 light:hover:bg-blue-50 light:text-slate-700 light:hover:text-blue-600 light:border light:border-slate-200 light:hover:border-blue-300 dark:bg-white/5 dark:hover:bg-blue-600/20 dark:text-slate-300 dark:hover:text-white dark:border dark:border-white/10 dark:hover:border-blue-500/40'
      } ${className}`}
    >
      {isSelected ? (
        <>
          <Check className="w-3.5 h-3.5 text-white" />
          <span>In Comparison List</span>
        </>
      ) : (
        <>
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Add to Compare</span>
        </>
      )}
    </button>
  );
}


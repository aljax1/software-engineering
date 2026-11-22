import { describe, it, expect } from 'vitest';
import {
  validateExpense,
  addExpense,
  deleteExpense,
  total,
  totalPerCategory,
  CATEGORIES,
  MAX_AMOUNT,
} from '../src/lib/expenses';

describe('validateExpense', () => {
  it('rejects empty description', () => {
    expect(validateExpense('   ', 10).ok).toBe(false);
  });

  it('rejects amount <= 0', () => {
    expect(validateExpense('Coffee', 0).ok).toBe(false);
    expect(validateExpense('Coffee', -5).ok).toBe(false);
  });

  it('rejects amount over max', () => {
    expect(validateExpense('Yacht', MAX_AMOUNT + 1).ok).toBe(false);
  });

  it('accepts valid input', () => {
    expect(validateExpense('Coffee', 4.5).ok).toBe(true);
  });

  it('rejects amount with more than 2 decimal places', () => {
    expect(validateExpense('Penny', 0.001).ok).toBe(false);
  });
});

describe('addExpense', () => {
  it('returns error and unchanged list on invalid input', () => {
    const { list, error } = addExpense([], '', 10, 'Food');
    expect(list).toHaveLength(0);
    expect(error).toBeDefined();
  });

  it('adds a trimmed expense on valid input', () => {
    const { list, error } = addExpense([], '  Lunch  ', 12, 'Food');
    expect(error).toBeUndefined();
    expect(list).toHaveLength(1);
    expect(list[0].description).toBe('Lunch');
    expect(list[0].category).toBe('Food');
  });

  it('does not mutate the original list', () => {
    const original: never[] = [];
    addExpense(original as never, 'Bus', 3, 'Transport');
    expect(original).toHaveLength(0);
  });
});

describe('deleteExpense', () => {
  it('removes the matching id and keeps the rest', () => {
    const list = [
      { id: 'a', description: 'X', amount: 1, category: 'Food' },
      { id: 'b', description: 'Y', amount: 2, category: 'Study' },
    ] as const;
    const result = deleteExpense([...list], 'a');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('b');
  });
});

describe('total', () => {
  it('sums all amounts', () => {
    const list = [
      { id: '1', description: 'a', amount: 10, category: 'Food' },
      { id: '2', description: 'b', amount: 20.5, category: 'Transport' },
    ];
    expect(total(list)).toBe(30.5);
  });

  it('returns 0 for empty list', () => {
    expect(total([])).toBe(0);
  });

  it('0.1 + 0.2 equals 0.3 (integer cents)', () => {
    const list = [
      { id: '1', description: 'a', amount: 0.1, category: 'Food' },
      { id: '2', description: 'b', amount: 0.2, category: 'Food' },
    ];
    expect(total(list)).toBe(0.3);
  });
});

describe('totalPerCategory', () => {
  it('groups sums by category with all categories present', () => {
    const list = [
      { id: '1', description: 'a', amount: 10, category: 'Food' },
      { id: '2', description: 'b', amount: 5, category: 'Food' },
      { id: '3', description: 'c', amount: 20, category: 'Transport' },
    ];
    const result = totalPerCategory(list);
    expect(result.Food).toBe(15);
    expect(result.Transport).toBe(20);
    expect(result.Study).toBe(0);
    expect(result.Other).toBe(0);
    expect(CATEGORIES).toEqual(['Food', 'Transport', 'Study', 'Other']);
  });
});

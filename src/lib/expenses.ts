export type Category = 'Food' | 'Transport' | 'Study' | 'Other';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
}

export const CATEGORIES: Category[] = ['Food', 'Transport', 'Study', 'Other'];

export const MAX_AMOUNT = 1_000_000;

export interface ValidationResult {
  ok: boolean;
  error?: string;
}

export function validateExpense(description: string, amount: number): ValidationResult {
  if (!description.trim()) {
    return { ok: false, error: 'Description cannot be empty.' };
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, error: 'Amount must be greater than 0.' };
  }
  if (amount > MAX_AMOUNT) {
    return { ok: false, error: `Amount cannot exceed ${MAX_AMOUNT.toLocaleString()}.` };
  }
  return { ok: true };
}

export function addExpense(
  list: Expense[],
  description: string,
  amount: number,
  category: Category
): { list: Expense[]; error?: string } {
  const result = validateExpense(description, amount);
  if (!result.ok) {
    return { list, error: result.error };
  }
  const expense: Expense = {
    id: crypto.randomUUID(),
    description: description.trim(),
    amount,
    category,
  };
  return { list: [...list, expense] };
}

export function deleteExpense(list: Expense[], id: string): Expense[] {
  return list.filter((e) => e.id !== id);
}

export function total(list: Expense[]): number {
  return list.reduce((sum, e) => sum + e.amount, 0);
}

export function totalPerCategory(list: Expense[]): Record<Category, number> {
  const base: Record<Category, number> = {
    Food: 0,
    Transport: 0,
    Study: 0,
    Other: 0,
  };
  return list.reduce((acc, e) => {
    acc[e.category] += e.amount;
    return acc;
  }, base);
}

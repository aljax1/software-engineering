import { useMemo, useState } from 'react';
import { Trash2, Plus, Wallet } from 'lucide-react';
import {
  addExpense,
  deleteExpense,
  total,
  totalPerCategory,
  CATEGORIES,
  MAX_AMOUNT,
  type Category,
  type Expense,
} from '@/lib/expenses';

const CATEGORY_COLORS: Record<Category, string> = {
  Food: 'bg-amber-500',
  Transport: 'bg-sky-500',
  Study: 'bg-emerald-500',
  Other: 'bg-slate-400',
};

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [error, setError] = useState<string | null>(null);

  const grandTotal = useMemo(() => total(expenses), [expenses]);
  const perCategory = useMemo(() => totalPerCategory(expenses), [expenses]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    const { list, error: addError } = addExpense(expenses, description, parsed, category);
    if (addError) {
      setError(addError);
      return;
    }
    setExpenses(list);
    setDescription('');
    setAmount('');
    setCategory('Food');
    setError(null);
  }

  function handleDelete(id: string) {
    setExpenses((prev) => deleteExpense(prev, id));
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-slate-900 p-3 text-white">
            <Wallet size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Expense Calculator</h1>
            <p className="text-sm text-slate-500">Track spending by category</p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Lunch with team"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
          >
            <Plus size={16} />
            Add Expense
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-3xl font-bold text-slate-900">
              ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <p className="text-sm text-slate-500 mb-2">Per Category</p>
            <div className="space-y-2">
              {CATEGORIES.map((c) => (
                <div key={c} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${CATEGORY_COLORS[c]}`} />
                    {c}
                  </span>
                  <span className="font-medium text-slate-700">
                    ${perCategory[c].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-700">Expenses ({expenses.length})</h2>
          </div>
          {expenses.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-400">No expenses yet. Add one above.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {expenses.map((e) => (
                <li key={e.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${CATEGORY_COLORS[e.category]}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{e.description}</p>
                      <p className="text-xs text-slate-400">{e.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-700">
                      ${e.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                      aria-label={`Delete ${e.description}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Max amount per expense: ${MAX_AMOUNT.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default App;

'use client';

import { useState, useTransition, FormEvent, useEffect } from 'react';
import { CheckCircleIcon, ClipboardDocumentIcon, TrashIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';

export type DashboardPassword = {
  id: string;
  label: string;
  username: string;
  passwordValue: string;
  url?: string;
  note?: string;
};

const initialForm = {
  label: '',
  username: '',
  passwordValue: '',
  url: '',
  note: '',
};

export const PasswordBoard = ({ initialEntries }: { initialEntries: DashboardPassword[] }) => {
  const [entries, setEntries] = useState(initialEntries);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [copyId, setCopyId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(initialForm);
  const [originalEditForm, setOriginalEditForm] = useState(initialForm);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (deleteId || editId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [deleteId, editId]);

  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => setHighlightId(null), 2500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [highlightId]);

  // Auto-dismiss success message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateError(null);
    setMessage(null);
    startTransition(async () => {
      const response = await fetch('/api/passwords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json();
        // Show validation errors if available
        if (data.details) {
          const fieldErrors = Object.values(data.details.fieldErrors || {}).flat();
          setCreateError(fieldErrors.length > 0 ? fieldErrors.join(', ') : data.error ?? 'Unable to save password');
        } else {
          setCreateError(data.error ?? 'Unable to save password');
        }
        return;
      }
      const data = await response.json();
      setEntries((prev) => [data.password, ...prev]);
      setForm(initialForm);
      setMessage('Password saved successfully!');
      setHighlightId(data.password.id);
      // Scroll to top to show the success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleCopy = async (value: string, id: string) => {
    await navigator.clipboard.writeText(value);
    setCopyId(id);
    setTimeout(() => setCopyId(null), 1500);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    const idToDelete = deleteId;
    setDeleteId(null);
    startTransition(async () => {
      const res = await fetch(`/api/passwords/${idToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        setEntries((prev) => prev.filter((entry) => entry.id !== idToDelete));
      }
    });
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const handleEditClick = (entry: DashboardPassword) => {
    setEditError(null);
    setEditId(entry.id);
    const formData = {
      label: entry.label,
      username: entry.username,
      passwordValue: entry.passwordValue,
      url: entry.url || '',
      note: entry.note || '',
    };
    setEditForm(formData);
    setOriginalEditForm(formData);
  };

  const hasChanges = () => {
    return (
      editForm.label !== originalEditForm.label ||
      editForm.username !== originalEditForm.username ||
      editForm.passwordValue !== originalEditForm.passwordValue ||
      editForm.url !== originalEditForm.url ||
      editForm.note !== originalEditForm.note
    );
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditForm(initialForm);
    setOriginalEditForm(initialForm);
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editId) return;
    setEditError(null);
    startTransition(async () => {
      const response = await fetch(`/api/passwords/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) {
        const data = await response.json();
        if (data.details) {
          const fieldErrors = Object.values(data.details.fieldErrors || {}).flat();
          setEditError(fieldErrors.length > 0 ? fieldErrors.join(', ') : data.error ?? 'Unable to update password');
        } else {
          setEditError(data.error ?? 'Unable to update password');
        }
        return;
      }
      const data = await response.json();
      setEntries((prev) => prev.map((entry) => (entry.id === editId ? data.password : entry)));
      setEditId(null);
      setEditForm(initialForm);
      setOriginalEditForm(initialForm);
      setMessage('Password updated successfully!');
      setHighlightId(data.password.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-xl shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">New entry</p>
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">Save a password</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Passwords remain private and live only in your vault.</p>
          </div>
          {message && (
            <div className="inline-flex items-center gap-2 animate-in fade-in slide-in-from-top-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/40 dark:bg-brand-500">
              <CheckCircleIcon className="h-5 w-5" />
              {message}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Label
            <input
              required
              value={form.label}
              onChange={(event) => setForm((prev) => ({ ...prev, label: event.target.value }))}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder="Bank Account"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Username or email
            <input
              required
              value={form.username}
              onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder="name@email.com"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Password
            <input
              required
              value={form.passwordValue}
              onChange={(event) => setForm((prev) => ({ ...prev, passwordValue: event.target.value }))}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder="••••••••"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            URL (optional)
            <input
              value={form.url}
              onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder="https://app.example.com"
            />
          </label>
          <label className="md:col-span-2">
            <span className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-300">Note</span>
            <textarea
              value={form.note}
              onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder="Recovery codes, MFA hints..."
              rows={3}
            />
          </label>
          <div className="md:col-span-2 flex items-center justify-between">
            {createError && <p className="text-sm text-red-500">{createError}</p>}
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? 'Encrypting…' : 'Save password'}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-xl shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">Vault</p>
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">Saved passwords</h3>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{entries.length} entries</p>
        </div>
        <div className="mt-6 space-y-4">
          {entries.length === 0 && <p className="text-sm text-zinc-500">Nothing saved yet. Add your first password above.</p>}
          {entries.map((entry) => {
            const isHighlighted = highlightId === entry.id;
            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4 transition hover:border-brand-200 dark:border-zinc-800 dark:bg-zinc-950/40 ${
                  isHighlighted ? 'ring-2 ring-brand-500/70 shadow-lg shadow-brand-500/20' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-zinc-900 dark:text-white truncate">{entry.label}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{entry.username}</p>
                  {entry.url && (
                    <a className="text-sm text-brand-600 underline decoration-dotted dark:text-brand-400" href={entry.url} target="_blank">
                      Visit
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(entry.passwordValue, entry.id)}
                    className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 sm:p-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-brand-500 dark:hover:bg-brand-950"
                    title={copyId === entry.id ? "Copied!" : "Copy password"}
                  >
                    {copyId === entry.id ? (
                      <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <ClipboardDocumentIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditClick(entry)}
                    className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 sm:p-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-brand-500 dark:hover:bg-brand-950"
                    title="Edit password"
                  >
                    <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(entry.id)}
                    className="rounded-lg border border-red-200 bg-white p-1.5 text-red-500 transition hover:border-red-300 hover:bg-red-50 sm:p-2 dark:border-red-500/50 dark:bg-zinc-900 dark:hover:border-red-500 dark:hover:bg-red-950"
                    title="Delete password"
                  >
                    <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleDeleteCancel}
          />
          {/* Modal */}
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-200/80 bg-white/98 p-6 shadow-2xl dark:border-zinc-700/80 dark:bg-zinc-900/98 backdrop-blur-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Delete password?</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  This action cannot be undone. The password will be permanently removed from your vault.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            {(() => {
              const entryToDelete = entries.find((e) => e.id === deleteId);
              return entryToDelete ? (
                <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{entryToDelete.label}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{entryToDelete.username}</p>
                </div>
              ) : null;
            })()}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isPending}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Modern Edit Modal */}
      {editId && (
        <div className="fixed inset-0 z-50">
          {/* Modern Backdrop */}
          <div
            className="fixed inset-0 z-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={handleEditCancel}
          />

          {/* Scrollable Modal Container */}
          <div className="relative z-10 flex h-full items-start justify-center overflow-y-auto px-3 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
            {/* Modal Panel */}
            <div className="relative z-30 w-full max-w-md transform overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-2xl transition-all duration-300 sm:max-w-2xl lg:max-w-3xl dark:border-zinc-700/80 dark:bg-zinc-900">
              {/* Header */}
              <div className="border-b border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-700 dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/20 sm:h-12 sm:w-12 sm:rounded-2xl">
                      <PencilIcon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl dark:text-white">Edit password</h3>
                      <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                        Update the details for this password entry
                      </p>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={handleEditCancel}
                    className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  >
                    <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* Form Content with Enhanced Styling */}
              <div className="modern-scrollbar p-4 sm:p-6 md:p-8">
                <form onSubmit={handleEditSubmit} className="flex flex-col gap-6">
                  {/* Input Grid */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Label Field */}
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-300">Label</span>
                      <input
                        type="text"
                        required
                        value={editForm.label}
                        onChange={(e) => setEditForm(prev => ({ ...prev, label: e.target.value }))}
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        placeholder="Bank Account"
                      />
                    </label>

                    {/* Username Field */}
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-300">Username or email</span>
                      <input
                        type="text"
                        required
                        value={editForm.username}
                        onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        placeholder="name@email.com"
                      />
                    </label>

                    {/* Password Field */}
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-300">Password</span>
                      <input
                        type="password"
                        required
                        value={editForm.passwordValue}
                        onChange={(e) => setEditForm(prev => ({ ...prev, passwordValue: e.target.value }))}
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        placeholder="••••••••"
                      />
                    </label>

                    {/* URL Field */}
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-300">URL (optional)</span>
                      <input
                        type="url"
                        value={editForm.url}
                        onChange={(e) => setEditForm(prev => ({ ...prev, url: e.target.value }))}
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        placeholder="https://app.example.com"
                      />
                    </label>
                  </div>

                  {/* Notes Field */}
                  <label className="block md:col-span-2">
                    <span className="mb-1 block text-sm font-medium text-zinc-600 dark:text-zinc-300">Note</span>
                    <textarea
                      rows={3}
                      value={editForm.note}
                      onChange={(e) => setEditForm(prev => ({ ...prev, note: e.target.value }))}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                      placeholder="Recovery codes, MFA hints..."
                    />
                  </label>

                  {/* Error Message */}
                  {editError && <p className="md:col-span-2 text-sm text-red-500">{editError}</p>}

                  {/* Action Buttons */}
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isPending || !hasChanges()}
                      className="rounded-lg bg-brand-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                    >
                      {isPending ? 'Updating…' : 'Update'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
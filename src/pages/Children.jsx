import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  School
} from 'lucide-react';
import DataTable from '../components/DataTable';
import { childService } from '../services/childService';

export default function Children() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [gradeFilter, setGradeFilter] = useState('All Grades');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Edit modal state
  const [editTarget, setEditTarget] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', age: '', grade: '', school: '' });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await childService.getChildren({
        search,
        grade: gradeFilter,
        status: statusFilter
      });
      setChildren(data);
    } catch (err) {
      console.error("Failed to load children", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, gradeFilter, statusFilter]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await childService.deleteChild(deleteTarget.id);
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      alert("Failed to delete record: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenEdit = (child) => {
    setEditTarget(child);
    setEditForm({
      name: child.name,
      age: child.age,
      grade: child.grade,
      school: child.school
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editTarget) return;
    try {
      setSavingEdit(true);
      await childService.updateChild(editTarget.id, editForm);
      setEditTarget(null);
      loadData();
    } catch (err) {
      alert("Failed to update child: " + err.message);
    } finally {
      setSavingEdit(false);
    }
  };

  const columns = [
    {
      header: 'Child ID',
      accessor: 'id',
      width: '120px',
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {row.id}
        </span>
      )
    },
    {
      header: 'Student Name',
      accessor: 'name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl ${row.avatarColor || 'bg-brand-600'} text-white font-bold flex items-center justify-center text-xs shadow-sm`}>
            {row.name.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-slate-900 block hover:text-brand-600 transition-colors">
              {row.name}
            </span>
            <span className="text-[10px] text-slate-400">{row.gender}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Age',
      accessor: 'age',
      width: '80px',
      sortable: true,
      render: (row) => <span className="text-slate-700 font-medium">{row.age} yrs</span>
    },
    {
      header: 'Grade',
      accessor: 'grade',
      width: '110px',
      sortable: true,
      render: (row) => (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          {row.grade}
        </span>
      )
    },
    {
      header: 'School / Institution',
      accessor: 'school',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
          <School size={13} className="text-slate-400" />
          <span>{row.school}</span>
        </div>
      )
    },
    {
      header: 'Assessment Status',
      accessor: 'status',
      width: '140px',
      sortable: true,
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            row.status === 'Assessed'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {row.status === 'Assessed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
          {row.status}
        </span>
      )
    },
    {
      header: 'Date Added',
      accessor: 'dateAdded',
      width: '110px',
      sortable: true,
      render: (row) => <span className="font-mono text-slate-400 text-[11px]">{row.dateAdded}</span>
    },
    {
      header: 'Actions',
      align: 'right',
      width: '160px',
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => navigate(`/children/${row.id}`)}
            className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="View Profile"
          >
            <Eye size={15} />
          </button>
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Edit Details"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Child"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header and Add Child Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Children Student Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage enrolled students, monitor assessment readiness, and inspect reading skill profiles
          </p>
        </div>

        <Link
          to="/children/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-semibold shadow-md shadow-brand-600/20 transition-all self-start sm:self-auto"
        >
          <UserPlus size={15} />
          <span>Register New Child</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, ID (e.g. CHD-101), or school..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All Grades">All Grades</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Assessed">Assessed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Children Table */}
      <DataTable
        columns={columns}
        data={children}
        loading={loading}
        pageSize={8}
        emptyMessage="No children matching your search or filters."
      />

      {/* Edit Child Modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-left animate-in fade-in-50 duration-200">
            <h3 className="text-base font-bold text-slate-900">
              Edit Student Details ({editTarget.id})
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Update institutional metadata for this child record.
            </p>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    required
                    min={4}
                    max={15}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={editForm.grade}
                    onChange={(e) => setEditForm({ ...editForm, grade: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
                  >
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={editForm.school}
                  onChange={(e) => setEditForm({ ...editForm, school: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors shadow-sm disabled:opacity-50"
                >
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-left animate-in fade-in-50 duration-200">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Confirm Child Record Deletion
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-800">{deleteTarget.name}</span> ({deleteTarget.id})? This will remove all associated historical assessment profiles.
            </p>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-sm disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

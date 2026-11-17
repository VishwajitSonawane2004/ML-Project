import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserPlus,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  School,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import { childService } from '../services/childService';

export default function AddChild() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '8',
    grade: 'Grade 3',
    gender: 'Female',
    school: 'Lincoln Elementary School',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Student name is required.');
      return;
    }

    try {
      setLoading(true);
      const newChild = await childService.createChild(formData);
      navigate(`/children/${newChild.id}`);
    } catch (err) {
      setError(err.message || 'Failed to register child.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left">
      {/* Back button and page title */}
      <div className="flex items-center gap-3">
        <Link
          to="/children"
          className="p-2 rounded-xl bg-white border border-slate-200/80 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Register New Child
          </h2>
          <p className="text-xs text-slate-500">
            Create an individual student record for longitudinal reading profile tracking
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Basic Demographics */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
              <User size={16} className="text-brand-600" />
              <span>Student Demographics</span>
            </h3>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Benjamin Hayes"
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Age (Years) *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min={5}
                  max={15}
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Assigned Grade Level *
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all font-medium"
                >
                  <option value="Grade 2">Grade 2 (Age 7)</option>
                  <option value="Grade 3">Grade 3 (Age 8)</option>
                  <option value="Grade 4">Grade 4 (Age 9)</option>
                  <option value="Grade 5">Grade 5 (Age 10)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Gender (Optional)
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  School / Educational Center *
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Lincoln Elementary"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Section: Educator Notes */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
              <FileText size={16} className="text-brand-600" />
              <span>Initial Diagnostic Observations (Optional)</span>
            </h3>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Teacher Notes / Accommodations
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Mention language background, prior reading interventions, hearing or speech considerations..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400 leading-relaxed"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/children')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-semibold shadow-md shadow-brand-600/30 transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span>Registering...</span>
              ) : (
                <>
                  <UserPlus size={15} />
                  <span>Save & Open Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

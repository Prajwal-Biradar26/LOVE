import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  X,
  Heart,
  Eye,
  MousePointerClick,
  Clock,
  CheckCircle2,
  RefreshCw,
  Database
} from 'lucide-react';
import { API_BASE_URL } from '../utils/api.js';

export const AdminDashboard = ({ isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/apology/analytics`);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setError(json.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError('Unable to reach backend API. Is server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const stats = data?.stats || {
    totalVisits: 0,
    yesClicks: 0,
    noInteractions: 0,
    letterViews: 0,
    memoriesViews: 0,
    finalYes: 0,
    needsTime: 0,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-rose-500/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Apology Analytics & Insights</h3>
              <p className="text-xs text-rose-300/70">100% Anonymous Journey Metrics</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={fetchAnalytics}
              disabled={loading}
              className="p-2 rounded-full text-rose-300 hover:text-white hover:bg-rose-500/10 transition-colors"
              title="Refresh Analytics"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-rose-300 hover:text-white hover:bg-rose-500/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Database Status Banner */}
        <div className="mb-6 px-4 py-2.5 rounded-xl bg-burgundy-900/50 border border-rose-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-rose-200">
            <Database size={14} className="text-rose-400" />
            <span>Database Storage:</span>
            <span className="font-semibold text-white">
              {data?.databaseConnected ? 'MongoDB (Connected)' : 'In-Memory Store (Dev Fallback)'}
            </span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Active
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-rose-200 text-sm">
            {error}
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="glass-card-hover rounded-2xl p-4 border border-rose-500/20 bg-burgundy-900/40">
            <div className="flex items-center justify-between text-rose-300 mb-2">
              <Eye size={16} />
              <span className="text-[10px] uppercase font-bold text-rose-400/60">Visits</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{stats.totalVisits}</div>
            <div className="text-[11px] text-rose-300/60 mt-1">Total page opens</div>
          </div>

          <div className="glass-card-hover rounded-2xl p-4 border border-rose-500/20 bg-burgundy-900/40">
            <div className="flex items-center justify-between text-rose-300 mb-2">
              <MousePointerClick size={16} />
              <span className="text-[10px] uppercase font-bold text-rose-400/60">NO Evaded</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-300">{stats.noInteractions}</div>
            <div className="text-[11px] text-rose-300/60 mt-1">Playful dodges</div>
          </div>

          <div className="glass-card-hover rounded-2xl p-4 border border-rose-500/20 bg-burgundy-900/40">
            <div className="flex items-center justify-between text-rose-300 mb-2">
              <CheckCircle2 size={16} className="text-pink-400" />
              <span className="text-[10px] uppercase font-bold text-rose-400/60">Forgiven</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-pink-300">{stats.yesClicks}</div>
            <div className="text-[11px] text-rose-300/60 mt-1">First YES clicks</div>
          </div>

          <div className="glass-card-hover rounded-2xl p-4 border border-rose-500/20 bg-burgundy-900/40">
            <div className="flex items-center justify-between text-rose-300 mb-2">
              <Heart size={16} className="text-rose-400 fill-rose-400" />
              <span className="text-[10px] uppercase font-bold text-rose-400/60">Final YES</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-rose-400">{stats.finalYes}</div>
            <div className="text-[11px] text-rose-300/60 mt-1">Started again ❤️</div>
          </div>
        </div>

        {/* Funnel Progress Visualizer */}
        <div className="glass-card-hover rounded-2xl p-5 border border-rose-500/20 bg-burgundy-900/40 mb-8">
          <h4 className="text-sm font-semibold text-rose-200 mb-4">Journey Progression Funnel</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-rose-300/80 mb-1">
                <span>1. Landed on Apology</span>
                <span>{stats.totalVisits}</span>
              </div>
              <div className="w-full h-2 bg-burgundy-950 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-rose-300/80 mb-1">
                <span>2. Accepted First Forgiveness (YES)</span>
                <span>{stats.yesClicks}</span>
              </div>
              <div className="w-full h-2 bg-burgundy-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500 rounded-full"
                  style={{
                    width: stats.totalVisits ? `${Math.min(100, (stats.yesClicks / stats.totalVisits) * 100)}%` : '0%',
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-rose-300/80 mb-1">
                <span>3. Read Memories & Letter</span>
                <span>{stats.letterViews || stats.memoriesViews || stats.finalYes}</span>
              </div>
              <div className="w-full h-2 bg-burgundy-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-400 rounded-full"
                  style={{
                    width: stats.totalVisits
                      ? `${Math.min(100, ((stats.letterViews || stats.finalYes) / stats.totalVisits) * 100)}%`
                      : '0%',
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-rose-300/80 mb-1">
                <span>4. Culmination (Final YES: {stats.finalYes} | Needs Time: {stats.needsTime})</span>
                <span>{stats.finalYes + stats.needsTime}</span>
              </div>
              <div className="w-full h-2 bg-burgundy-950 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-rose-500"
                  style={{
                    width: stats.totalVisits ? `${Math.min(100, (stats.finalYes / stats.totalVisits) * 100)}%` : '0%',
                  }}
                  title="Final YES"
                />
                <div
                  className="h-full bg-amber-400/80"
                  style={{
                    width: stats.totalVisits ? `${Math.min(100, (stats.needsTime / stats.totalVisits) * 100)}%` : '0%',
                  }}
                  title="Needs Time"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Anonymous Activity Log */}
        <div>
          <h4 className="text-sm font-semibold text-rose-200 mb-3">Recent Anonymous Interactions</h4>
          <div className="glass-panel-subtle rounded-xl p-3 max-h-48 overflow-y-auto space-y-2 text-xs">
            {data?.recentActivity?.length ? (
              data.recentActivity.map((act) => (
                <div
                  key={act._id}
                  className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-burgundy-900/30 text-rose-200/90"
                >
                  <span className="font-mono text-rose-300 text-[11px]">{act.event}</span>
                  <span className="text-[10px] text-rose-400/60 font-mono">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-rose-400/50 text-center py-4">No interaction events recorded yet</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

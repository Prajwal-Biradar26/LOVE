import mongoose from 'mongoose';
import { isDatabaseConnected } from '../config/database.js';

const interactionSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    enum: [
      'page_opened',
      'apology_started',
      'yes_clicked',
      'no_interaction',
      'letter_viewed',
      'memories_viewed',
      'final_yes',
      'needs_time'
    ],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  }
}, { timestamps: true });

const MongoInteraction = mongoose.models.Interaction || mongoose.model('Interaction', interactionSchema);

// In-memory fallback store when running without MongoDB
const memoryStore = [];

export const Interaction = {
  async create(data) {
    const record = {
      event: data.event,
      timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      details: data.details || {},
      _id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    memoryStore.push(record);

    if (isDatabaseConnected()) {
      try {
        return await MongoInteraction.create(data);
      } catch (err) {
        console.error('Failed to save to Mongo, retained in memory:', err.message);
      }
    }
    return record;
  },

  async find(query = {}) {
    if (isDatabaseConnected()) {
      try {
        return await MongoInteraction.find(query).sort({ timestamp: -1 }).lean();
      } catch (err) {
        console.error('Mongo query failed, using memory store:', err.message);
      }
    }
    return [...memoryStore].reverse();
  },

  async countDocuments(query = {}) {
    if (isDatabaseConnected()) {
      try {
        return await MongoInteraction.countDocuments(query);
      } catch (err) {
        console.error('Mongo count failed, using memory store:', err.message);
      }
    }
    if (query.event) {
      return memoryStore.filter(i => i.event === query.event).length;
    }
    return memoryStore.length;
  },

  async aggregate(pipeline) {
    if (isDatabaseConnected()) {
      try {
        return await MongoInteraction.aggregate(pipeline);
      } catch (err) {
        console.error('Mongo aggregation failed, fallback to memory aggregation:', err.message);
      }
    }
    // Simple memory fallback aggregation for event counts
    const counts = {};
    for (const item of memoryStore) {
      counts[item.event] = (counts[item.event] || 0) + 1;
    }
    return Object.entries(counts).map(([event, count]) => ({ _id: event, count }));
  }
};

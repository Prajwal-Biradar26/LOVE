import { Interaction } from '../models/Interaction.js';
import { isDatabaseConnected } from '../config/database.js';

const ALLOWED_EVENTS = [
  'page_opened',
  'apology_started',
  'yes_clicked',
  'no_interaction',
  'letter_viewed',
  'memories_viewed',
  'final_yes',
  'needs_time'
];

export const recordInteraction = async (req, res) => {
  try {
    const { event, timestamp, details } = req.body;

    if (!event || !ALLOWED_EVENTS.includes(event)) {
      return res.status(400).json({
        success: false,
        error: `Invalid event. Allowed events: ${ALLOWED_EVENTS.join(', ')}`
      });
    }

    // Sanitize details: only keep safe anonymous fields (e.g. noButtonAttempts, stepNumber)
    const sanitizedDetails = {};
    if (details && typeof details === 'object') {
      if (typeof details.attempts === 'number') sanitizedDetails.attempts = details.attempts;
      if (typeof details.step === 'number') sanitizedDetails.step = details.step;
      if (typeof details.durationMs === 'number') sanitizedDetails.durationMs = details.durationMs;
    }

    await Interaction.create({
      event,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      details: sanitizedDetails
    });

    return res.status(200).json({
      success: true,
      message: 'Interaction recorded ❤️'
    });
  } catch (error) {
    console.error('Error recording interaction:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to record interaction'
    });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const totalVisits = await Interaction.countDocuments({ event: 'page_opened' });
    const yesClicks = await Interaction.countDocuments({ event: 'yes_clicked' });
    const noInteractions = await Interaction.countDocuments({ event: 'no_interaction' });
    const letterViews = await Interaction.countDocuments({ event: 'letter_viewed' });
    const memoriesViews = await Interaction.countDocuments({ event: 'memories_viewed' });
    const finalYes = await Interaction.countDocuments({ event: 'final_yes' });
    const needsTime = await Interaction.countDocuments({ event: 'needs_time' });

    const recent = await Interaction.find();
    const recentActivity = recent.slice(0, 25);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalVisits,
          yesClicks,
          noInteractions,
          letterViews,
          memoriesViews,
          finalYes,
          needsTime,
        },
        databaseConnected: isDatabaseConnected(),
        recentActivity
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    });
  }
};

export const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Love server is running ❤️',
    database: isDatabaseConnected() ? 'connected' : 'in-memory-fallback'
  });
};

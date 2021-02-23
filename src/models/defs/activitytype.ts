import { Schema } from 'mongoose'

export const ActivityType = new Schema({
  ActivityType: {
    type: String,
    enum: ['WEEKLY_LUNCH'],
  },
})

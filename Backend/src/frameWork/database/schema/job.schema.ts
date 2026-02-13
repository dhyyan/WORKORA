import { Schema, Types } from "mongoose";
import { Job } from "../../../domain/entities/job.entity";

export const jobSchema = new Schema<Job>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:"client"
    },

    freelancerId:{
      type:Schema.Types.ObjectId,
      require:false,
      ref:"freelancer"
    },

    title: {
      type: String,
      required: true
    },

    summary: {
      type: String,
      required: true
    },

    features: {
      type: [String],
      required: true
    },

    category: {
      type: String,
      required: true
    },

    duration: {
      type: String,
      required: true
    },

    deadline: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["open", "assigned", "closed"],
      default: "open",
      required: true
    }
  },
  {
    timestamps: true
  }
);
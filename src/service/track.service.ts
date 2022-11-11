import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TrackModel, {
    TrackDocument,
    TrackInput,
} from "../models/track.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createTrack(input: TrackInput) {
  const metricsLabels = {
    operation: "createTrack",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await TrackModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findTrack(
  query: FilterQuery<TrackDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findTrack",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await TrackModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateTrack(
  query: FilterQuery<TrackDocument>,
  update: UpdateQuery<TrackDocument>,
  options: QueryOptions
) {
  return TrackModel.findOneAndUpdate(query, update, options);
}

export async function deleteTrack(query: FilterQuery<TrackDocument>) {
  return TrackModel.deleteOne(query);
}
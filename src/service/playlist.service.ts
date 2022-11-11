import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PlaylistModel, {
    PlaylistDocument,
    PlaylistInput,
} from "../models/playlist.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createPlaylist(input: PlaylistInput) {
  const metricsLabels = {
    operation: "createPlaylist",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PlaylistModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findPlaylist(
  query: FilterQuery<PlaylistDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findPlaylist",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PlaylistModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdatePlaylist(
  query: FilterQuery<PlaylistDocument>,
  update: UpdateQuery<PlaylistDocument>,
  options: QueryOptions
) {
  return PlaylistModel.findOneAndUpdate(query, update, options);
}

export async function deletePlaylist(query: FilterQuery<PlaylistDocument>) {
  return PlaylistModel.deleteOne(query);
}
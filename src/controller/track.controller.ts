import { Request, Response } from "express";
import {
  CreateTrackInput,
  UpdateTrackInput,
} from "../schema/track.schema";
import {
  createTrack,
  deleteTrack,
  findAndUpdateTrack,
  findTrack,
} from "../service/track.service";

export async function createTrackHandler(
  req: Request<{}, {}, CreateTrackInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const track = await createTrack({ ...body, user: userId });

  return res.send(track);
}

export async function updateTrackHandler(
  req: Request<UpdateTrackInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const trackId = req.params.trackId;
  const update = req.body;

  const track = await findTrack({ trackId });

  if (!track) {
    return res.sendStatus(404);
  }

  if (String(track.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedTrack = await findAndUpdateTrack({ trackId }, update, {
    new: true,
  });

  return res.send(updatedTrack);
}

export async function getTrackHandler(
  req: Request<UpdateTrackInput["params"]>,
  res: Response
) {
  const trackId = req.params.trackId;
  const track = await findTrack({ trackId });

  if (!track) {
    return res.sendStatus(404);
  }

  return res.send(track);
}

export async function deleteTrackHandler(
  req: Request<UpdateTrackInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const trackId = req.params.trackId;

  const track = await findTrack({ trackId });

  if (!track) {
    return res.sendStatus(404);
  }

  if (String(track.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteTrack({ trackId });

  return res.sendStatus(200);
}
import { Request, Response } from "express";
import {
  CreatePlaylistInput,
  UpdatePlaylistInput,
} from "../schema/playlist.schema";
import {
  createPlaylist,
  deletePlaylist,
  findAndUpdatePlaylist,
  findPlaylist,
} from "../service/playlist.service";

export async function createPlaylistHandler(
  req: Request<{}, {}, CreatePlaylistInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const playlist = await createPlaylist({ ...body, user: userId });

  return res.send(playlist);
}

export async function updatePlaylistHandler(
  req: Request<UpdatePlaylistInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const playlistId = req.params.playlistId;
  const update = req.body;

  const playlist = await findPlaylist({ playlistId });

  if (!playlist) {
    return res.sendStatus(404);
  }

  if (String(playlist.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedPlaylist = await findAndUpdatePlaylist({ playlistId }, update, {
    new: true,
  });

  return res.send(updatedPlaylist);
}

export async function getPlaylistHandler(
  req: Request<UpdatePlaylistInput["params"]>,
  res: Response
) {
  const playlistId = req.params.playlistId;
  const playlist = await findPlaylist({ playlistId });

  if (!playlist) {
    return res.sendStatus(404);
  }

  return res.send(playlist);
}

export async function deletePlaylistHandler(
  req: Request<UpdatePlaylistInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const playlistId = req.params.playlistId;

  const playlist = await findPlaylist({ playlistId });

  if (!playlist) {
    return res.sendStatus(404);
  }

  if (String(playlist.user) !== userId) {
    return res.sendStatus(403);
  }

  await deletePlaylist({ playlistId });

  return res.sendStatus(200);
}
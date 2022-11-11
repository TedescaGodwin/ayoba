import {Express, Request, Response} from "express";
import { createTrackHandler, deleteTrackHandler, getTrackHandler, updateTrackHandler } from "./controller/track.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createTrackSchema, deleteTrackSchema, getTrackSchema, updateTrackSchema } from "./schema/track.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createPlaylistHandler, updatePlaylistHandler, getPlaylistHandler, deletePlaylistHandler } from "./controller/playlist.controller";
import { createPlaylistSchema, updatePlaylistSchema, getPlaylistSchema, deletePlaylistSchema } from "./schema/playlist.schema";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/users", validateResource(createUserSchema), createUserHandler);
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);
    app.get("/api/sessions", requireUser, getUserSessionsHandler);
    app.delete("/api/sessions", requireUser, deleteSessionHandler);


    app.post(
      "/api/playlists",
      [requireUser, validateResource(createPlaylistSchema)],
      createPlaylistHandler
    );
  app.put(
      "/api/playlists/:playlistId",
      [requireUser, validateResource(updatePlaylistSchema)],
      updatePlaylistHandler
    );
  
    app.get(
      "/api/playlists/:playlistId",
      validateResource(getPlaylistSchema),
      getPlaylistHandler
    );
  
    app.delete(
      "/api/playlists/:playlistId",
      [requireUser, validateResource(deletePlaylistSchema)],
      deletePlaylistHandler
    );


    app.post(
        "/api/tracks",
        [requireUser, validateResource(createTrackSchema)],
        createTrackHandler
      );
    app.put(
        "/api/tracks/:trackId",
        [requireUser, validateResource(updateTrackSchema)],
        updateTrackHandler
      );
    
      app.get(
        "/api/tracks/:trackId",
        validateResource(getTrackSchema),
        getTrackHandler
      );
    
      app.delete(
        "/api/tracks/:trackId",
        [requireUser, validateResource(deleteTrackSchema)],
        deleteTrackHandler
      );
}

export default routes;
import {Express, Request, Response} from "express";
import { createPlaylistHandler, deletePlaylistHandler, getPlaylistHandler, updatePlaylistHandler } from "./controller/playlist.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createPlaylistSchema, deletePlaylistSchema, getPlaylistSchema, updatePlaylistSchema } from "./schema/playlist.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

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
}

export default routes;
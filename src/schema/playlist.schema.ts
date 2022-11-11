import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    creator: string({
        required_error: "Creator is required",
      }),
    playtime: number({
    required_error: "Playtime is required",
    }),
  }),
};

const params = {
    params: object({
      playlistId: string({
        required_error: "playlistId is required",
      }),
    }),
  };
  
  export const createPlaylistSchema = object({
    ...payload,
  });
  
  export const updatePlaylistSchema  = object({
    ...payload,
    ...params,
  });
  
  export const deletePlaylistSchema  = object({
    ...params,
  });
  
  export const getPlaylistSchema  = object({
    ...params,
  });
  
  export type CreatePlaylistInput = TypeOf<typeof createPlaylistSchema>;
  export type UpdatePlaylistInput = TypeOf<typeof updatePlaylistSchema>;
  export type ReadPlaylistInput = TypeOf<typeof getPlaylistSchema>;
  export type DeletePlaylistInput = TypeOf<typeof deletePlaylistSchema>;
import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
        name: string({
        required_error: "Name is required",
    }),
        album: string({
        required_error: "Album, is required",
      }),
        artist: string({
        required_error: "Artist is required",
      }),
        duration: number({
        required_error: "Duration is required",
      }),
      artwork: string({
        required_error: "Artwork, is required",
      }),
      audio: string({
        required_error: "Audio is required",
      }),
  }),
};


const params = {
  params: object({
    trackId: string({
      required_error: "trackId is required",
    }),
  }),
};

export const createTrackSchema = object({
  ...payload,
});

export const updateTrackSchema  = object({
  ...payload,
  ...params,
});

export const deleteTrackSchema  = object({
  ...params,
});

export const getTrackSchema  = object({
  ...params,
});

export type CreateTrackInput = TypeOf<typeof createTrackSchema>;
export type UpdateTrackInput = TypeOf<typeof updateTrackSchema>;
export type ReadTrackInput = TypeOf<typeof getTrackSchema>;
export type DeleteTrackInput = TypeOf<typeof deleteTrackSchema>;
import { number, object, string } from "zod";

export const createTrackSchema = object({
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
});
import { ReleaseNote } from "./releaseNote";
import { Connection } from "./utils";

export type Release = {
  id: string;
  title: string;
  date: string;
  releaseNotes: Connection<ReleaseNote>;
};

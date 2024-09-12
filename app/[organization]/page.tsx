import { getChangelog } from "./actions";
import { Fragment } from "react";
import { ChangelogHeader, ChangelogContent } from "@/features/changelog";

export default async function Page() {
  const data = await getChangelog();

  return (
    <Fragment>
      <ChangelogHeader />

      <ChangelogContent releasesConnection={data.changelog.releases} />
    </Fragment>
  );
}

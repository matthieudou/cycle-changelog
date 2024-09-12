import { getChangelog } from "@/services/api";
import { Fragment } from "react";
import { ChangelogHeader, ChangelogContent } from "@/features/changelog";

export default async function Page() {
  const changelog = await getChangelog();

  return (
    <Fragment>
      <ChangelogHeader />

      <ChangelogContent changelog={changelog} />
    </Fragment>
  );
}

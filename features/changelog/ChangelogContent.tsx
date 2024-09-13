"use client";

import { Fragment, useState } from "react";
import { Connection, Release } from "@/services/models";
import { ChangelogRelease } from "./ChangelogRelease";
import { ChangelogMenu } from "./ChangelogMenu";

export function ChangelogContent({
  releasesConnection,
}: {
  releasesConnection: Connection<Release>;
}) {
  const [activeId, setActiveId] = useState<string>(
    releasesConnection.edges[0].node.id
  );

  return (
    <main className="pb-12 md:py-32 px-4 md:px-8 max-w-screen-xl mx-auto flex">
      <ChangelogMenu
        releasesConnection={releasesConnection}
        activeId={activeId}
      />

      <div className="flex-1">
        {releasesConnection.edges.map((releaseEdge) => (
          <Fragment key={releaseEdge.node.id}>
            <ChangelogRelease
              release={releaseEdge.node}
              onIntersect={(isVisible) => {
                if (isVisible) {
                  setActiveId(releaseEdge.node.id);
                }
              }}
            />

            <hr className="last:hidden my-20" />
          </Fragment>
        ))}
      </div>

      <div className="w-64 hidden xl:block" role="presentation" />
    </main>
  );
}

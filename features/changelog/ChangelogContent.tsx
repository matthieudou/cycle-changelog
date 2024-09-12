"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { TableOfContents } from "./TableOfContents";
import { usePathname } from "next/navigation";
import { Connection, Release } from "@/services/models";
import { ChangelogRelease } from "./ChangelogRelease";

export function ChangelogContent({
  releasesConnection,
}: {
  releasesConnection: Connection<Release>;
}) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>(
    releasesConnection.edges[0].node.id
  );

  return (
    <main className="py-12 md:py-32 px-8 max-w-screen-xl mx-auto flex">
      <aside className="sticky self-start top-8 w-64 hidden md:block">
        <Link
          href={`${pathname}/release/create`}
          className="text-blue-cycle -mx-3 inline-block px-3 py-1 hover:bg-blue-50 rounded-lg transition"
        >
          Add release
        </Link>

        <TableOfContents
          className="mt-1"
          links={releasesConnection.edges.map((edge) => ({
            id: edge.node.id,
            title: format(edge.node.date, "MMMM dd, yyyy"),
          }))}
          activeId={activeId}
        />
      </aside>

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

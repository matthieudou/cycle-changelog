"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Fragment } from "react";
import { TableOfContents } from "./TableOfContents";
import { usePathname } from "next/navigation";
import { Connection, Release } from "@/services/models";

export function ChangelogContent({
  releasesConnection,
}: {
  releasesConnection: Connection<Release>;
}) {
  const pathname = usePathname();

  return (
    <main className="py-12 md:py-32 px-8 max-w-screen-xl mx-auto flex">
      <aside className="sticky top-0 w-64 hidden md:block">
        <Link href={`${pathname}/release/create`} className="text-blue-cycle">
          Add release
        </Link>

        <TableOfContents
          className="mt-4"
          links={releasesConnection.edges.map((edge) => ({
            id: edge.node.id,
            title: format(edge.node.date, "MMMM dd, yyyy"),
          }))}
          activeId="UHVibGljUmVsZWFzZV80Y2YyNTQ5OC1iODU1LTRhZDMtOWU1YS00YjA3Y2MzMDgzN2Q="
        />
      </aside>

      <div className="flex-1">
        {releasesConnection.edges.map((edge) => (
          <Fragment key={edge.node.id}>
            <section className="space-y-16">
              <h2 className="text-3xl font-bold scroll-mt-12" id={edge.node.id}>
                {edge.node.title}
              </h2>

              {edge.node.releaseNotes.edges.map((releaseNoteEdge) => (
                <article key={releaseNoteEdge.node.id}>
                  <div>
                    <h3 className="font-semibold text-2xl">
                      {releaseNoteEdge.node.title}
                    </h3>
                    <div
                      className="mt-8 prose prose-img:rounded-xl prose-img:aspect-[3/2] object-cover"
                      dangerouslySetInnerHTML={{
                        __html: releaseNoteEdge.node.htmlContent,
                      }}
                    />
                  </div>
                </article>
              ))}
            </section>

            <hr className="last:hidden my-20" />
          </Fragment>
        ))}
      </div>

      <div className="w-64 hidden xl:block" role="presentation" />
    </main>
  );
}

import { Release } from "@/services/models";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function ChangelogRelease({
  release,
  onIntersect,
}: {
  release: Release;
  onIntersect?: (isVisible: boolean) => void;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useInView(ref, { margin: "0px 0px -50% 0px", amount: 0.5 });

  useEffect(() => {
    onIntersect?.(isVisible);
  }, [isVisible]);

  return (
    <section className="space-y-16">
      <h2 ref={ref} className="text-3xl font-bold scroll-mt-12" id={release.id}>
        {release.title} {isVisible && "👀"}
      </h2>

      {release.releaseNotes.edges.map((releaseNoteEdge) => (
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
  );
}

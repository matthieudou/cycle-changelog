import { Release } from "@/services/models";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Copy, CopyCheck } from "@/features/ui/icons";
import { copy } from "@/utils/copy";

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

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [isCopiedIconVisible, setIsCopiedIconVisible] = useState(false);

  const handleCopy = async (value: string) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    const isCopied = await copy(value);
    setIsCopiedIconVisible(isCopied);
    timeoutId.current = setTimeout(() => setIsCopiedIconVisible(false), 4000);
  };

  return (
    <section className="space-y-16 group">
      <div className="flex items-center justify-between gap-4">
        <h2
          ref={ref}
          className="text-3xl font-bold scroll-mt-12"
          id={release.id}
        >
          {release.title}
        </h2>
        <button
          className="flex items-center gap-2 text-blue-cycle opacity-0 group-hover:opacity-100 transition"
          onClick={() =>
            handleCopy(
              `${window.location.origin}${window.location.pathname}#${release.id}`
            )
          }
        >
          {isCopiedIconVisible ? (
            <>
              <CopyCheck />
              Copied!
            </>
          ) : (
            <>
              <Copy />
              Copy link
            </>
          )}
        </button>
      </div>

      {release.releaseNotes.edges.map((releaseNoteEdge) => (
        <article key={releaseNoteEdge.node.id}>
          <div>
            <h3 className="font-semibold text-2xl">
              {releaseNoteEdge.node.title}
            </h3>
            <div
              className="mt-8 prose max-w-full prose-img:rounded-xl prose-img:aspect-[3/2] object-cover"
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

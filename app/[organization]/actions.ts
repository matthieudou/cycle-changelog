import { gql } from "@apollo/client";
import { client } from "@/services/api";
import { getRandomNumberBetween } from "@/utils/numbers";
import { releaseNoteFactory } from "./seed";
import { Release, Connection } from "@/services/models";

export type GetChangelogQueryData = {
  changelog: {
    id: string;
    isPublished: boolean;
    slug: string;
    title: string;
    name: string;
    releases: Connection<Release>;
  };
};

export async function getChangelog(): Promise<GetChangelogQueryData> {
  const { data } = await client().query<GetChangelogQueryData>({
    query: gql`
      query GetChangelog {
        changelog: getChangelogBySlug(slug: "interview-test") {
          id
          isPublished
          slug
          title
          name
          releases {
            edges {
              node {
                id
                title
                date
                releaseNotes {
                  edges {
                    node {
                      id
                      title
                      htmlContent
                      position
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    changelog: {
      ...data.changelog,
      releases: enhanceEmptyReleasesWithReleaseNotes(data.changelog.releases),
    },
  };
}

function enhanceEmptyReleasesWithReleaseNotes(
  releases: Connection<Release>
): Connection<Release> {
  return {
    edges: releases.edges.map((edge) => {
      if (edge.node.releaseNotes.edges.length) return edge;

      const releaseNotes = Array.from(
        { length: getRandomNumberBetween(1, 3) },
        () => releaseNoteFactory()
      );

      return {
        node: {
          ...edge.node,
          releaseNotes: {
            edges: releaseNotes.map((releaseNote, index) => ({
              node: {
                ...releaseNote,
                position: index,
              },
            })),
          },
        },
      };
    }),
  };
}

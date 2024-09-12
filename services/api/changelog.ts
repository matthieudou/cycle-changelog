import { gql } from "@apollo/client";
import { client } from "./apolloClient";
import { getRandomNumberBetween } from "@/utils/numbers";
import { releaseNoteFactory } from "./seed";

export const GET_CHANGELOG = gql`
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
`;

type Connection<T> = {
  edges: Edge<T>[];
};

type Edge<T> = {
  node: T;
};

type Release = {
  id: string;
  title: string;
  date: string;
  releaseNotes: Connection<ReleaseNote>;
};

type ReleaseNote = {
  id: string;
  title: string;
  htmlContent: string;
  position: number;
};

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

export async function getChangelog() {
  const { data } = await client().query<GetChangelogQueryData>({
    query: GET_CHANGELOG,
  });
  return {
    ...data.changelog,
    releases: enhanceEmptyReleasesWithReleaseNotes(data.changelog.releases),
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

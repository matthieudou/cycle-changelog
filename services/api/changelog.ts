import { gql } from "@apollo/client";
import { client } from "./apolloClient";

export const GET_CHANGELOG = gql`
  query GetChangelog {
    changelog: getChangelogBySlug(slug: "interview-test") {
      id,
      isPublished,
      slug,
      title,
      name,
      releases {
        edges {
          cursor,
          node {
            id,
            title,
            date,
            releaseNotes {
              edges {
                cursor,
                node {
                  id,
                  title,
                  htmlContent,
                  position
                }
              }
            }
          }
        }
      }
    }
  }
`

type Connection<T> = {
  edges: Edge<T>[];
}

type Edge<T> = {
  cursor: string;
  node: T;
}

type Release = {
  id: string;
  title: string;
  date: string;
  releaseNotes: Connection<ReleaseNote>
}

type ReleaseNote = {
  id: string;
  title: string;
  htmlContent: string;
  position: number;
}

export type GetChangelogQueryData = {
  changelog: {
    id: string;
    isPublished: boolean;
    slug: string;
    title: string;
    name: string;
    releases: Connection<Release>
  }
}

export async function getChangelog () {
  const { data } = await client().query<GetChangelogQueryData>({ query: GET_CHANGELOG })
  return {
    ...data.changelog,
    releases: {
      edges: data.changelog.releases.edges.filter(edge => edge.node.releaseNotes.edges.length > 0)
    }
  }
}
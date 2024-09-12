"use server";

import { client } from "@/services/api";
import { gql } from "@apollo/client";

export async function createAndPublishRelease(
  title: string,
  date: string
): Promise<void> {
  const response = await client().mutate({
    mutation: gql`
      mutation CreateAndPublishRelease($date: Date!, $title: String!) {
        createRelease(
          date: $date
          title: $title
          productId: "UHJvZHVjdF8zNThkYmUxOS0xNThiLTQ2ZGItYmJiNi1lMTI3ZTM2OGI1ODQ="
        ) {
          id
        }
      }
    `,
    variables: {
      title,
      date,
    },
  });

  console.log(response);

  await client().mutate({
    mutation: gql`
      mutation PublishRelease($id: ID!) {
        publishRelease(id: $id) {
          id
        }
      }
    `,
    variables: {
      id: response.data.createRelease.id,
    },
  });
}

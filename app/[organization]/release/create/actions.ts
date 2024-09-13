"use server";

import { client } from "@/services/api";
import { gql } from "@apollo/client";
import { revalidatePath } from "next/cache";

export async function createAndPublishRelease(
  title: string,
  date: string
): Promise<void> {
  const createResponse = await client().mutate({
    mutation: gql`
      mutation CreateAndPublishRelease {
        createRelease(
          date: "${date}"
          title: "${title}"
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

  const publishResponse = await client().mutate({
    mutation: gql`
      mutation PublishRelease {
        publishRelease(id: "${createResponse.data.createRelease.id}") {
          id
        }
      }
    `,
  });

  return publishResponse.data.publishRelease;
}

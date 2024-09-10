import { getChangelog } from "@/services/api"
import { ShipButton } from "./ShipButton"
import { Fragment } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"

export default async function Page ({ params }: { params: { organization: string } }) {
  const changelog = await getChangelog()

  return (
    <Fragment>
      <header className="pt-24 max-w-2xl mx-auto text-center">
        <h1 className="text-6xl text-gray-900 font-sans font-bold">Changelog</h1>
        <p className="mt-10 font-medium text-lg">What did you <ShipButton/> this week ?</p>
        <div className="mt-6 text-[#2B44EE] flex gap-4 justify-center items-center">
          <a href="https://x.com/CycleProduct" target="_blank" rel="noopener noreferrer">Subscribe for updates</a>
          <div role="presentation" className="size-1 rounded-full bg-neutral-200"></div>
          <a href="https://x.com/CycleProduct" target="_blank" rel="noopener noreferrer">Follow us on X (Twitter)</a>
        </div>
      </header>

      <main className="mt-32 max-w-screen-xl mx-auto flex">
        <aside className="sticky top-0 w-64 block">
          <Link href={`${params.organization}/release/create`}>
            Add release
          </Link>
        </aside>

        <div className="flex-1">
          {changelog.releases.edges.map(edge => (
            <Fragment key={edge.node.id}>
              <section className="space-y-16">
                <h2 className="text-3xl font-bold">{edge.node.title}</h2>

                {edge.node.releaseNotes.edges.map((releaseNoteEdge) => (
                  <article>
                    <div key={releaseNoteEdge.node.id}>
                      <h3 className="font-semibold text-2xl">{releaseNoteEdge.node.title}</h3>
                      <div className="mt-8" dangerouslySetInnerHTML={{__html: releaseNoteEdge.node.htmlContent}} />
                    </div>
                  </article>
                ))}
              </section>

              <hr className="last:mb-96 my-20"/>
            </Fragment>
          ))}
        </div>

        <div className="w-64" role="presentation" />
      </main>
    </Fragment>
  )
}
import { getRandomElementInArray } from "@/utils/arrays"
import { generateUuid } from "@/utils/uuid"

export function releaseNoteFactory () {
  const randomReleaseNote = getRandomElementInArray(releaseNotesData)
  return {
    id: generateUuid(),
    title: `${randomReleaseNote.title} (Seed)`,
    htmlContent: randomReleaseNote.htmlContent,
    position: 0
  }
}

const releaseNotesData = [
  {
    title: '🚀 Salesforce Integration',
    htmlContent: `
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1722538808/548ca798-ad08-4ea1-854d-d13ba551d503.png" alt="">
      <p>It was already possible to sync Cycle and Salesforce via API but now you can install a native Salesforce integration. There are two use cases:</p>
      <p>First, customer-facing teams can send feedback straight from Salesforce to the product team. You can do so from any Lead, Contact, or Account page.</p>
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1722538804/ddac5a3b-0881-4bdd-9b00-a32a2c6e791c.png">
      <p>Second, you can set up an automation to automatically send all messages that match specific criteria using Cycle’s API.</p>
      <p>In both cases, you'll receive updates on Salesforce as soon as the customer requests status changes in Cycle, helping you close the feedback loop every time you ship something.</p>
      <p>Read more about this integration in <a href="https://help.cycle.app/setup/integrations/salesforce" target="_blank">Cycle’s doc</a></p>
    `
  },
  {
    title: '🌐 AI - Preferred Language',
    htmlContent: `
      <p>For those receiving feedback in various languages, you can now define AI's preferred language for AI-generated titles. It helps keep the workspace consistent.</p>
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1722616242/0e3673ee-bd54-4fed-ba41-7fb729672343.png">
    `
  },
  {
    title: '🧠 AI - Multi-Models',
    htmlContent: `
      <p>Sometimes, LLMs are down. But your feedback autopilot still needs to run. So we now automatically switch from one model to the other in case there's an error. That way, your AI requests get done in a consistent way.</p>
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1722616426/dbfcb28b-3086-46fd-b907-853ca362edee.png">
    `
  },
  {
    title: '🛡️ AI - Robustness',
    htmlContent: `
      <p>To further enhance robustness, we've also introduced a retry mechanism. If an error or wrong format is provided by the LLM, the prompt will be retried to ensure reliability.</p>
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1722620271/aa6f15b5-44dd-45bb-9630-c9984852f917.png">
    `
  },
  {
    title: '📝 Changelog - Template',
    htmlContent: `
      <p>Creating a changelog from scratch can be daunting. To simplify this process, we now offer templates from the best changelogs out there.</p>
      <p>Just pick a template and start from there.</p>
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1721316946/3a193ef1-d733-4866-87da-8df908cdc5dc.gif">
    `
  },
  {
    title: '✒️ Changelog - Font Customization',
    htmlContent: `
      <p>Easily update your changelog's font with one click and preview the result in real-time using your data.</p>
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1722507892/a6a0825d-adfe-4151-91d4-33451ca02171.gif">
    `
  },
  {
    title: '✨ Improved AI feature recommendations',
    htmlContent: `
      <p>We’ve refined the logic for linking features to insights in autopilot mode. We’re now way stricter, meaning we match only when we’re sure of our recommendations.</p>
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1721390298/54d4116f-5743-4e7f-a87c-093dddcae808.png">
      <p>Here’s a recap of our improved semantic match logic:</p>
      <ol>
      <li>We link the closest feature to a quote if there’s a clear match.</li>
      <li>If no link is found, we check among existing quotes that are already linked for a close match. If there’s a clear winner, we link the quote to that feature</li>
      <li>If still unmatched, we generate a potential new feature name with AI and compare it semantically with existing features. If there is a clear winner, we link that feature.</li>
      </ol>
      <p>If no matches are found after these steps, we'll suggest the best potential matches in the recommendations.</p>
      <img src="https://res.cloudinary.com/do44szjts/image/upload/v1721390664/b3e7baef-331e-470f-a05e-ef9c91414677.jpg">
    `
  },
]
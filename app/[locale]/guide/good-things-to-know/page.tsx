import { permanentRedirect } from "next/navigation"
import { localizePath } from "../../../../lib/i18n"
import { getLocale } from "../../../../lib/locale"

export default async function GuideGoodToKnowRedirect() {
  permanentRedirect(localizePath("/guide", await getLocale()))
}

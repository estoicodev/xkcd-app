import { use18N } from "context/i18n"

export default function Footer () {
  const { t } = use18N()

  return (
    <footer className="w-full min-h-full text-center p-3">
      <div dangerouslySetInnerHTML={{ __html: t("FOOTER_TEXT",
        "<a href='https://github.com/estoicodev' target='_blank' class='text-black text-lg font-semibold no-underline hover:underline mx-1'>estoicodev</a>",
        "<a href='https://xkcd.com/' target='_blank' class='text-black text-lg font-semibold no-underline hover:underline mx-1'>xkcd comics</a>")
        }}>
      </div>
    </footer>
  )
}
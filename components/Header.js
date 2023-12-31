import {NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, menu} from "@nextui-org/react"
import {useState} from "react"
import { useRouter } from "next/router"
import { use18N } from "context/i18n"

export default function Header({ isHome }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {locale, locales} = useRouter()
  const { t } = use18N()

  const menuItems = [
    t("HOME_NAV_ITEM"),
    t("SEARCH_NAV_ITEM"),
    "Api",
  ]

  const restOfLocales = locales.filter((l) => l !== locale)

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href={`/${locale}`} locale={locale} className="text-inherit">
            🖍️ <span className="text-black font-bold">Next</span>
            XKCD
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href={`/${locale}`} locale={locale}>
            {menuItems[0]}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={`/${locale}/search`}>
            {menuItems[1]}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className={`${isHome ? 'flex': 'hidden'} text-black`}>
          <Link href={`/${restOfLocales[0]}`} locale={restOfLocales[0]} >
            {restOfLocales[0]}
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="/api/search" target="_blank">
            {menuItems[2]}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === menuItems.length - 1 ? "primary" : "foreground"
              }
              className="w-full"
              href={
                index === 0 ? '/' : index === menuItems.length - 1 ? `/${item.toLowerCase()}/search` : `/${item.toLowerCase()}`
              }
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
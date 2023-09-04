import SearchIcon from "components/SearchIcon";
import {Button, Input} from "@nextui-org/react";
import {use18N} from "context/i18n";

export default function Searcher({ className, onSearch, searchQuery, setSearchQuery }) {
  const { t } = use18N()

  return (
    <div className={className}>
      <Input
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && searchQuery !== '') {
            onSearch()
          }
        }}
        size="lg"
        radius="lg"
        classNames={{
          input: [
            "bg-transparent",
            "text-black/90",
            "placeholder:text-default-700/50",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-lg",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "group-data-[focused=true]:bg-default-200/50",
            "!cursor-text",
          ],
        }}
        placeholder="Relativity, Real estate..."
        startContent={
          <SearchIcon className="text-black/50 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        endContent={
          <Button onClick={() => {
            if (searchQuery !== '') onSearch()
          }} size="md" variant="solid" className="text-base text-black/60 bg-slate-200 border-slate-500 border-2">
            {t("SEARCH_BUTTON_TEXT")}
          </Button>
        }
      />
    </div>
  )
}
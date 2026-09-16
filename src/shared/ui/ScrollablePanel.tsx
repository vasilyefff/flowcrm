import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type ScrollablePanelProps = {
  children: ReactNode
}

export const ScrollablePanel = ({ children }: ScrollablePanelProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const updateScrollState = () => {
    const element = scrollRef.current

    if (!element) return

    const { scrollTop, scrollHeight, clientHeight } = element

    setCanScrollUp(scrollTop > 0)
    setCanScrollDown(scrollTop + clientHeight < scrollHeight)
  }

  useEffect(() => {
    updateScrollState()
  }, [children])

  return (
    <div className="relative xl:rounded-xl xl:ring-1 xl:ring-slate-300 xl:shadow-md">
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="xl:max-h-[calc(100vh-18rem)] xl:overflow-y-auto xl:rounded-xl"
      >
        {children}
      </div>

      {canScrollUp && (
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-10 rounded-t-xl bg-gradient-to-b from-slate-200/80 to-transparent xl:block" />
      )}

      {canScrollDown && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-10 rounded-b-xl bg-gradient-to-t from-slate-200/80 to-transparent xl:block" />
      )}
    </div>
  )
}

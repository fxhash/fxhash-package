"use client"

import { cn } from "@fxhash/ui"
import { TypedDocumentNode, useQuery } from "@apollo/client"
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { Masonry } from "react-plock"

export interface QueryIfiniteListParams<TWhereVariables, TOrderBy> {
  limit: number
  offset: number
  where: TWhereVariables
  orderBy?: TOrderBy
}

export interface InfiniteListProps<
  TDataQuery,
  TWhereVariables,
  TOrderBy,
  TVariablesQuery extends QueryIfiniteListParams<TWhereVariables, TOrderBy>,
  TArrayQuery,
  TDataAggregateQuery,
  TVariablesAggregateQuery,
> {
  query: TypedDocumentNode<TDataQuery, TVariablesQuery>
  where: TWhereVariables
  orderBy?: TOrderBy
  items: TArrayQuery[]
  setItems: Dispatch<SetStateAction<TArrayQuery[]>>
  getItems: (data: TDataQuery) => TArrayQuery[]
  aggregateQuery: TypedDocumentNode<
    TDataAggregateQuery,
    TVariablesAggregateQuery
  >
  getCount: (data: TDataAggregateQuery) => number
  renderItem: (item: TArrayQuery, data?: TDataQuery) => React.ReactNode
  renderSkeleton: () => React.ReactNode
  pageSize: number
  page: number
  setPage: (page: number) => void
  noData: React.ReactNode
  itemKey: keyof TArrayQuery
  className?: string
  columns?: number
  columnGap?: number
}

export function InfiniteList<
  TDataQuery,
  TWhereVariables,
  TOrderBy,
  TVariablesQuery extends QueryIfiniteListParams<TWhereVariables, TOrderBy>,
  TArrayQuery,
  TDataAggregateQuery,
  TVariablesAggregateQuery,
>({
  query,
  where,
  orderBy,
  getItems,
  renderItem,
  renderSkeleton,
  aggregateQuery,
  getCount,
  pageSize,
  page,
  setPage,
  noData,
  itemKey,
  items,
  setItems,
  className,
  columns = 2,
  columnGap = 16,
}: InfiniteListProps<
  TDataQuery,
  TWhereVariables,
  TOrderBy,
  TVariablesQuery,
  TArrayQuery,
  TDataAggregateQuery,
  TVariablesAggregateQuery
>) {
  const _loaderRef = useRef<HTMLDivElement>(null)
  const _aggregate = useQuery(aggregateQuery, {
    variables: {
      where: where,
    },
  })

  const maxCount = useMemo(
    () => getCount(_aggregate.data as TDataAggregateQuery),
    [_aggregate.data, getCount]
  )

  const _data = useQuery(query, {
    skip: _aggregate.loading,
    variables: {
      where,
      orderBy,
      limit: pageSize,
      offset: page * pageSize,
    } as TVariablesQuery,
    onCompleted: data => {
      const _newItems = getItems(data as TDataQuery) as TArrayQuery[]
      setItems((prevItems: TArrayQuery[]) => {
        const existingItems = new Set(prevItems.map(i => i[itemKey]))
        const newItems = _newItems.filter(i => !existingItems.has(i[itemKey]))
        return [...prevItems, ...newItems] as TArrayQuery[]
      })
    },
  })

  const hasMore = items.length < maxCount

  const loadMore = useCallback(() => {
    if (_data.loading) return
    setPage(page + 1)
  }, [_data.loading, setPage, page])

  // we use the lastLoad ref to prevent multiple loads in a short time
  // so to say a poor mans throttle
  const lastLoad = useRef<number>(Date.now())
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          !_data.loading &&
          lastLoad.current + 500 < Date.now()
        ) {
          loadMore()
          lastLoad.current = Date.now()
        }
      },
      {
        rootMargin: "100px",
      }
    )
    const el = _loaderRef.current
    if (el) observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [loadMore])

  // Reset items when changes
  useEffect(() => {
    setItems([])
    setPage(0)
    _aggregate.refetch()
    _data.refetch()
  }, [JSON.stringify(orderBy), JSON.stringify(where), aggregateQuery, query])

  if (maxCount === 0 && !_aggregate.loading) {
    return noData
  }

  let loaders: string[] = []

  if (_data.loading || _aggregate.loading) {
    loaders = Array.from({ length: pageSize }).map((_, i) => "loader")
  }

  function isLoader(item: TArrayQuery | string): item is "loader" {
    return item === "loader"
  }

  function isData(item: TArrayQuery | string): item is TArrayQuery {
    return typeof item !== "string" && !isLoader(item)
  }

  return (
    <>
      <Masonry
        className={cn("w-full", className)}
        items={[...items, ...loaders]}
        config={{
          columns: [columns, columns + 2, columns + 4],
          gap: [columnGap, columnGap, columnGap],
          media: [640, 768, 1024],
        }}
        render={(item: TArrayQuery | string, idx) => (
          <Fragment key={String(idx)}>
            {isData(item) && renderItem(item, _data.data)}
            {isLoader(item) && renderSkeleton()}
          </Fragment>
        )}
      />
      {hasMore && !_data.loading && <div ref={_loaderRef} className="h-12" />}
    </>
  )
}

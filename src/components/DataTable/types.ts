export type Column = {
  key: string
  title: string
}

export type Row = {
  id: string
  title: string
  [key: string]: any
}

export type Action = {
  key: string
  label: string
  color?: ActionColumnColors
  handler: (row: Row) => void
}

export type DataTablePagination = {
  page: number
  perPage: number
  total: number
  prev?: boolean
  next?: boolean
  onChangePage: (page: number) => void
  onChangePerPage: (perPage: number) => void
}

export enum ActionColumnColors {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

export type DataTableProps = {
  readonly data: Row[]
  readonly columns: Column[]
  readonly actions?: Action[]
  readonly pagination?: DataTablePagination
}

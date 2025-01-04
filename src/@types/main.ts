export type SelectProps = {} & Omit<ListProps, 'model'>

export type ListProps = {
  options: OptionType[]
  multiple?: boolean
  max?: number
  allOption?: boolean
  hideSelected?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any
}

export type OptionProps = {} & OptionType &
  Pick<ListProps, 'multiple' | 'max' | 'hideSelected' | 'allOption' | 'model'>

export type OptionType = {
  value: string
  label: string
  description?: string
  disabled?: boolean
  checked?: boolean
  preIcon?: string
  postIcon?: string
}

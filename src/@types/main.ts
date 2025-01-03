export type SelectProps = {
  options: OptionType[]
  multiple?: boolean
  max?: number
  allOption?: boolean
}

export type OptionType = {
  value: string
  label: string
  disabled?: boolean
}

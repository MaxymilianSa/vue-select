export type SelectProps = {
  options: OptionType[]
  multiple?: boolean
  max?: number
}

export type OptionType = {
  value: string
  label: string
  disabled?: boolean
}

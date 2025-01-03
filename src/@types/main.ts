export type SelectProps = {
  options: OptionType[]
  multiple?: boolean
}

export type OptionType = {
  value: string
  label: string
  disabled?: boolean
}

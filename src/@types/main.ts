import type { VNode } from 'vue'

export type SelectProps = {
  disabled?: boolean
  clearable?: boolean
} & Omit<ListProps, 'model'>

export type ValueType = string | OptionType['value'][]

export type ListProps = {
  options: OptionType[]
  multiple?: boolean
  max?: number
  allOption?: boolean
  hideSelected?: boolean
  model?: ValueType
}

export type OptionProps = {
  className?: string
} & OptionType &
  Pick<ListProps, 'multiple' | 'max' | 'hideSelected' | 'allOption' | 'model'>

export type OptionType = {
  value: string
  label: string
  description?: string
  disabled?: boolean
  preIcon?: VNode
  postIcon?: VNode
}

export type IconProps = {
  color?: string
  size?: number
}

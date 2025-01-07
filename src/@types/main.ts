/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VNode } from 'vue'

export type SelectProps = {} & Omit<ListProps, 'model'>

export type ListProps = {
  options: OptionType[]
  multiple?: boolean
  max?: number
  allOption?: boolean
  hideSelected?: boolean
  model: any
  modelValue: any
  modelModifiers: any
}

export type OptionProps = {} & OptionType &
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

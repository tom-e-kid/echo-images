import { builder as legacy } from './legacy'
import type { GeneratorInput, Templates } from '../schema'

const templateBuilders = {
  legacy,
}

export const buildTemplate = (variant: Templates, input: GeneratorInput) => {
  const builder = templateBuilders[variant] ?? legacy
  return builder(input)
}

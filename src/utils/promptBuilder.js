/**
 * Template interpolation engine — Section 12.1
 * Resolves {{variableName}} from step state chain
 */

const TRUNCATION_THRESHOLD = 8000

export function buildPrompt(template, state) {
  if (!template) return ''

  return template.replace(/\{\{(\w+)\.(\w+)\}\}/g, (match, source, key) => {
    if (source === 'runMeta') {
      return state.runMeta?.[key] || match
    }

    // stepN.field pattern
    const stepMatch = source.match(/^step(\w+)$/)
    if (stepMatch) {
      const stepId = stepMatch[1]
      const stepState = state.steps?.[stepId]
      if (!stepState) return match

      if (key === 'aiOutput') {
        const output = stepState.aiOutput || ''
        if (output.length > TRUNCATION_THRESHOLD) {
          return output.slice(0, TRUNCATION_THRESHOLD) + '\n\n[Output truncated. Key sections preserved.]'
        }
        return output || match
      }

      return stepState.inputs?.[key] || match
    }

    return match
  })
}

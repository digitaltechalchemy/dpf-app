/**
 * localStorage state management — Section 9 of build spec
 * All state lives under key: dpf_run_state
 */

const STORAGE_KEY = 'dpf_run_state'

const DEFAULT_STATE = {
  currentStep: '1',
  steps: {},
  runMeta: {
    nicheName: '',
    startedAt: null,
    aiProvider: 'claude',
    canvaConnected: false,
    brandKitName: '',
    brandKitId: '',
    productFolderPath: '',
  },
}

function createDefaultStepState() {
  return {
    status: 'locked',
    inputs: {},
    aiOutput: null,
    savedToFolder: false,
    savedFilename: null,
    completedAt: null,
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initState()
    return JSON.parse(raw)
  } catch {
    return initState()
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function initState() {
  const state = {
    ...DEFAULT_STATE,
    steps: {
      '1': { ...createDefaultStepState(), status: 'available' },
    },
  }
  saveState(state)
  return state
}

export function getStepState(state, stepId) {
  return state.steps[stepId] || createDefaultStepState()
}

export function updateStepInputs(state, stepId, inputs) {
  const step = getStepState(state, stepId)
  const newState = {
    ...state,
    steps: {
      ...state.steps,
      [stepId]: { ...step, inputs: { ...step.inputs, ...inputs } },
    },
  }
  saveState(newState)
  return newState
}

export function saveAiOutput(state, stepId, output) {
  const step = getStepState(state, stepId)
  const newState = {
    ...state,
    steps: {
      ...state.steps,
      [stepId]: { ...step, aiOutput: output },
    },
  }
  saveState(newState)
  return newState
}

export function completeStep(state, stepId, nextStepId) {
  const step = getStepState(state, stepId)
  const nextStep = getStepState(state, nextStepId)
  const newState = {
    ...state,
    currentStep: nextStepId || stepId,
    steps: {
      ...state.steps,
      [stepId]: { ...step, status: 'complete', completedAt: new Date().toISOString() },
      ...(nextStepId ? { [nextStepId]: { ...nextStep, status: 'available' } } : {}),
    },
  }
  saveState(newState)
  return newState
}

export function markStepInProgress(state, stepId) {
  const step = getStepState(state, stepId)
  const newState = {
    ...state,
    currentStep: stepId,
    steps: {
      ...state.steps,
      [stepId]: { ...step, status: 'in_progress' },
    },
  }
  saveState(newState)
  return newState
}

export function updateRunMeta(state, meta) {
  const newState = {
    ...state,
    runMeta: { ...state.runMeta, ...meta },
  }
  saveState(newState)
  return newState
}

export function markSavedToFolder(state, stepId, filename) {
  const step = getStepState(state, stepId)
  const newState = {
    ...state,
    steps: {
      ...state.steps,
      [stepId]: { ...step, savedToFolder: true, savedFilename: filename },
    },
  }
  saveState(newState)
  return newState
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY)
  return initState()
}

export function getCompletionPercentage(state, stepOrder) {
  const total = stepOrder.length
  const completed = stepOrder.filter(
    id => state.steps[id]?.status === 'complete'
  ).length
  return Math.round((completed / total) * 100)
}

export function getSelectNonArrayValueError(): Error {
  return Error('Value must be an array in multiple-selection mode.');
}

export function getMatSelectDynamicMultipleError(): Error {
  return Error('Cannot change `multiple` mode of select after initialization.');
}

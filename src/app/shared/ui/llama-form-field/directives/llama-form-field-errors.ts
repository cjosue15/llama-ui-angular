/** @docs-private */
export function getLlamaFormFieldMissingControlError(): Error {
  return Error('llama-form-field must contain a LlamaFormFieldControl.');
}

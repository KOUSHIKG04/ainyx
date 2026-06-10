let shouldSimulateError = false;

export function setMockError(value: boolean): void {
  shouldSimulateError = value;
}

export function isMockErrorEnabled(): boolean {
  return shouldSimulateError;
}

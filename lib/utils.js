export function trimComma(string) {
	return string.trim().replace(/\,$/, '')
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
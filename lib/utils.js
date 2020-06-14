function trimComma(string) {
	return string.trim().replace(/\,$/, '')
}

module.exports = {
	trimComma
}
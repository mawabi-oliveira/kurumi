"use strict";

// Mapa nome do estado -> sigla (UF)
const STATES = {
	acre: "AC",
	alagoas: "AL",
	amapá: "AP",
	amazonas: "AM",
	bahia: "BA",
	ceará: "CE",
	"distrito federal": "DF",
	"espírito santo": "ES",
	goiás: "GO",
	maranhão: "MA",
	"mato grosso": "MT",
	"mato grosso do sul": "MS",
	"minas gerais": "MG",
	pará: "PA",
	paraíba: "PB",
	paraná: "PR",
	pernambuco: "PE",
	piauí: "PI",
	"rio de janeiro": "RJ",
	"rio grande do norte": "RN",
	"rio grande do sul": "RS",
	rondônia: "RO",
	roraima: "RR",
	"santa catarina": "SC",
	"são paulo": "SP",
	sergipe: "SE",
	tocantins: "TO",
};

const UFS = Object.values(STATES);

/**
 * Converte o nome ("Alagoas") ou a sigla ("al", "AL") de um estado para a sigla em maiúsculas.
 * @param {string} value Nome ou sigla do estado.
 * @returns {string|null} Sigla (ex.: "AL") ou null se o estado for inválido.
 */
function toUF(value) {
	if (typeof value !== "string") return null;
	const text = value.trim();
	if (UFS.includes(text.toUpperCase())) return text.toUpperCase();
	return STATES[text.toLowerCase()] || null;
}

module.exports = { toUF };

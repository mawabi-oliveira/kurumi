"use strict";

const { toUF } = require("./states");

// * Como criar validações no padrão: https://youtu.be/PknC5SCkwjo?si=kX9V8wmRcDA65H0r

class FluentValidator {
	#errors;

	constructor(){
		this.#errors = [];
	}

	/**
	 * 
	 * @param {any} value Valor a ser validado.
	 * @param {String} message Mensagem que será posta no array em caso de erro.
	 */
	isRequired(value, message){
		if(!value || value.length <= 0)
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {String} value Valor a ser validado.
	 * @param {Number} min Valor mínimo da string.  
	 * @param {String} message Mensagem que será posta no array em caso de erro.
	 */
	hasMinLen(value, min, message){
		if(!value || value.length < min)
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {*} value Valor a ser validado.
	 * @param {*} max Valor máximo da string. 
	 * @param {*} message Mensagem que será posta no array em caso de erro.
	 */
	hasMaxLen(value, max, message){
		if(!value || value.length > max)
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {*} value Valor a ser validado.
	 * @param {*} len Valor fixo da string. 
	 * @param {*} message Mensagem que será posta no array em caso de erro.
	 */
	isFixedLen(value, len, message){
		if(!value || value.length !== len)
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {string} value Valor a ser validado. 
	 * @param {string} message Mensagem que será posta no array em caso de erro.
	 */
	haveSpaces(value, message){
		if(typeof value === "string" && /\s/.test(value))
			this.setPushError({ message });
	}

	/**
	 * 
	 * @param {*} value Valor a ser validado.
	 */
	isEmail(value){
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		if(typeof value !== "string" || !regex.test(value))
			this.setPushError({ message: "E-mail inválido." });
	}

	/**
	 * 
	 * @param {String} value Valor a ser validado.
	 */
	isPassword(value){
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,75}$/;
		if(typeof value !== "string" || !regex.test(value)){
			this.setPushError({
				message: "Senha inválida."
			})
		}
	}

	/**
	 * 
	 * @param {string} value Valor a ser validado.
	 * @param {string} message Mensagem que será posta no array em caso de erro.
	 */
	isCEP(value, message) {
		const cepRegex = /^\d{5}-?\d{3}$/;
		if (!cepRegex.test(value))
			this.setPushError({ message: message || "CEP inválido." });
	}

	/**
	 * Valida se o estado é válido. Aceita o nome completo ("Alagoas") ou a sigla ("AL").
	 * @param {string} value Nome ou sigla do estado a ser validado
	 * @param {string} message Mensagem que será posta no array em caso de erro
	 */
	isState(value, message) {
		if (!toUF(value))
			this.setPushError({ message: message || "Estado inválido." });
	}

	getErrors = () => this.#errors;
	setPushError = error => this.#errors.push(error);
	clearErrors = () => this.#errors = [];
	isValid = () => this.#errors.length === 0;
}

module.exports = FluentValidator;

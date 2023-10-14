import Request from '../utils/request.js'
import operate from '../common/operate.js'
let request = new Request().http

export const Login = function(data) {
	return request({
		url: "/sms/system/login",
		method: "POST",
		data: data,
	})
}

export const getUserInfo = function(data) {
	return request({
		url: "/sms/system/getInfo",
		method: "GET",
		data: data,
	})
}

export const getUserInfoById = function(data) {
	return request({
		url: "/sms/sysAccount/getUserById/" + data,
		method: "GET",
	})
}

export const addDrugremind = function(data) {
	return request({
		url: "/sms/sysPatient/addReminder",
		method: "POST",
		data: data
	})
}

export const addRegister = function(data) {
	return request({
		url: "/sms/sysAccount/saveOrUpdateUser",
		method: "POST",
		data: data
	})
}

export const getDoctorList = function(data) {
	return request({
		url: "/sms/sysDoctor/getDoctors",
		method: "GET",
	})
}

export const getHospitalsByCityName = function(data) {
	return request({
		url: "/sms/sysHospital/getHospitalsByCityName/" + data,
		method: "GET",
	})
}

export const getDepartmentsById = function(data) {
	return request({
		url: "/sms/sysDepartment/getDepartmentsById/" + data,
		method: "GET",
	})
}

export const getDoctor = function(data) {
	return request({
		url: "/sms/sysDoctor/" + data,
		method: "GET",
	})
}

export const getAllScience = function(data) {
	return request({
		url: "/sms/doctorPatient/getAllScience",
		method: "GET",
	})
}

export const changeUserInfo = function(data) {
	return request({
		url: "/sms/sysPatient/saveOrUpdateSysPatient",
		method: "POST",
		data: data
	})
}

export const getDrugremind = function(data) {
	return request({
		url: "/sms/sysPatient/getReminderById/" + data,
		method: "GET"
	})
}

export const addGuahao = function(data) {
	return request({
		url: "/sms/orderInfo/saveOrUpdateOrderInfo",
		method: "POST",
		data: data
	})
}

export const getGuahao = function(data) {
	return request({
		url: "/sms/orderInfo/saveOrUpdateUser/" + data,
		method: "GET"
	})
}


export const addMedicalInfo = function(data) {
	return request({
		url: "/sms/sysPatient/addMedicalInfo",
		method: "POST",
		data: data
	})
}

export const getMedicalInfo = function(data) {
	return request({
		url: "/sms/sysPatient/getMedicalInfo/" + data,
		method: "GET"
	})
}

export const addPrescription = function(data) {
	return request({
		url: "/sms/sysPatient/addPrescription",
		method: "POST",
		data: data
	})
}

export const getPrescription = function(data) {
	return request({
		url: "/sms/sysPatient/selectPrescription/" + data,
		method: "GET"
	})
}
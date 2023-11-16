import Request from '../utils/request.js'
import operate from '../common/operate.js'
let request = new Request().http

// 登录
export const Login = function(data) {
	return request({
		url: "/auth/login",
		method: "POST",
		data: data,
	})
}

// 微信一键登录
export const wxLogin = function(data) {
	return request({
		url: "/auth/wxLogin",
		method: "POST",
		data: data,
	})
}

// 根据用户类型获取用户信息
export const getUserInfoByType = function(data) {
	return request({
		url: "/user/getUserInfoByType",
		method: "GET",
		data
	})
}

// 根据用户ID获取用户信息
export const getUserInfoById = function(data) {
	return request({
		url: "/user/" + data,
		method: "GET",
	})
}

export const setOpenIdByUserId = function(data) {
	return request({
		url: "/user/setOpenIdByUserId",
		method: "GET",
		data
	})
}

// export const getUserInfo = function(data) {
// 	return request({
// 		url: "/sms/system/getInfo",
// 		method: "GET",
// 		data: data,
// 	})
// }

export const addDrugremind = function(data) {
	return request({
		url: "/sms/sysPatient/addReminder",
		method: "POST",
		data: data
	})
}

// 注册
export const addRegister = function(data) {
	return request({
		url: "/user",
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

// 根据城市获取医院列表
export const getHospitalsByCityName = function(data) {
	return request({
		url: "/hospital/getHospitalByCity/" + data,
		method: "GET",
	})
}

// 根据医院ID获取科室信息
export const getDepartmentsById = function(data) {
	return request({
		url: "/primary-department/getDepartmentById/" + data,
		method: "GET",
	})
}

export const getDoctor = function(data) {
	return request({
		url: "/sms/sysDoctor/" + data,
		method: "GET",
	})
}

// 获取所有资讯
export const getAllScience = function(data) {
	return request({
		url: "/news",
		method: "GET",
	})
}

// 
export const getDoctorBySecondaryDepartmentIdAndDay = function(data) {
	return request({
		url: "/user/getDoctorBySecondaryDepartmentIdAndDay",
		method: "POST",
		data
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

// 添加挂号信息
export const addGuahao = function(data) {
	return request({
		url: "/appointment",
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

// 根据用户ID添加就诊信息
export const addMedicalInfo = function(data) {
	return request({
		url: "/medical-info",
		method: "POST",
		data: data
	})
}

// 根据用户ID获取用户就诊信息
export const getMedicalInfo = function(data) {
	return request({
		url: "/medical-info/getMedicalInfoByUserId/" + data,
		method: "GET"
	})
}

// 根据用户ID获取用户挂号信息
export const getAppointmentByUserId = function(data) {
	return request({
		url: "/appointment/getAppointmentByUserId",
		method: "GET",
		data: data
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
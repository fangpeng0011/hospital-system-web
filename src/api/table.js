import request from '@/utils/request'

export function getDoctorList(params) {
  return request({
    url: '/doctorService/pageDoctorCondition',
    method: 'post',
    data: params
  })
}

//修改讲师
export function updateDoctorInfo(doctor) {
  return request({
    url: '/doctorService/updateDoctor',
    method: 'post',
    data: doctor
  })
}

//删除讲师
export function deleteTeacherId(id) {
  return request({
    url: `/doctorService/deleteDoctorByid/${id}`,
    method: 'delete'
  })
}

//批量删除讲师
export function deleteDoctorIds(ids) {
  return request({
    url: `/doctorService/deleteDoctorByids`,
    method: 'post',
    data: ids
  })
}


export function addDoctor(teacher) {
  return request({
    url: `/doctorService/addDoctor/`,
    method: 'post',
    data: teacher
  })
}




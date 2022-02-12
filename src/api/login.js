import request from "../util/request";

//  注册

/**
 * 
 * @param {*} data 
 * @returns 
 * data:{userName:'',userPassword:''}
 */
export const login = data => {
  return request({
    method: 'POST',
    url: `/api/login`,
    data
  })
}
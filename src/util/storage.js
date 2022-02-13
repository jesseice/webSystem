
// 添加数据到本地存储
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

// 删除数据

export const removeItem = key => window.localStorage.removeItem(key)

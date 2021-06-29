const getConfig = (name) => {
  return window._env_[`${name}`]
}

export default getConfig

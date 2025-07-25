// ========== ACTIVE SESSION ===========
const saveUser = (user) => {
  localStorage.setItem("quickpoll-active-user", JSON.stringify(user));
}

const getActiveUser = () => {
  const user = localStorage.getItem("quickpoll-active-user")
  return user ? JSON.parse(user) : null;
}

const removeActiveUser = () => {
  localStorage.removeItem("quickpoll-active-user")
}

// ========== MOCK DATABASE ==========

const addUserToList = (newUser) => {
  const existingUser = JSON.parse(localStorage.getItem("quickpoll-user-list")) || [];
  existingUser.push(newUser);
  localStorage.setItem("quickpoll-user-list", JSON.stringify(existingUser));
}

const getAllUser = () => {
  const allUser = localStorage.getItem("quickpoll-user-list")
  return allUser? JSON.parse(allUser) : []; 
}


export {
  saveUser,
  getActiveUser,
  removeActiveUser,
  addUserToList,
  getAllUser
}
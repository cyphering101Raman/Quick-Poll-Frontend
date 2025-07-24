const saveUser = (user) =>{
  localStorage.setItem("quickpoll-user", JSON.stringify(user));
}

const getUser = () =>{
  const user = localStorage.getItem("quickpoll-user")
  return user? JSON.parse(user): null;
}

const removeUser = () =>{
  localStorage.removeItem("quickpoll-user")
}

export {
  saveUser, 
  getUser, 
  removeUser
}
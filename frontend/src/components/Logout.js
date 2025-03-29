export const logout = () => {
  console.log('Logging out...');
  sessionStorage.removeItem("loginToken")
  window.location.reload();
}

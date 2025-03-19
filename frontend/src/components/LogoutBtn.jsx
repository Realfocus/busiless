export default function LogoutBtn() {

  const clearStorage = () => {
    console.log('Logging out...');
    localStorage.removeItem("loginToken")
    window.location.reload();
  }
  
  return (
    <button className='bg-red-500 p-2 text-white rounded' onClick={clearStorage}>Logout</button>
  )
}
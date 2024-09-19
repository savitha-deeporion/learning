class User{
    static get(){
        
      return   fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response.json())
        return response.json()
      })
    }
}
export default  User

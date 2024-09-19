import axios from "axios";

class User2 {
  static async get() {
    try {
      // Await the axios GET request
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      
      
   
      return response
    } catch (error) {
      console.error("Error fetching the data", error);
      throw error;  // Re-throw the error to be handled in your tests
    }
  }
}

export default User2;

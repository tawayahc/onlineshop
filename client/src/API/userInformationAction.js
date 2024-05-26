import axios from "axios";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil/userInfo";

const useInformationActions =  (userId) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const fetchUserInfo = async () => {

    try {
      const response = await axios.get(
        `http://localhost:3333/user/${userId}`
      );
      if (response.data.status === "ok") {
        setUserInfo(response.data.data);
      } else {
        console.error(
          "Error fetching user information:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };
  
  const updateUserInfo = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3333/user/${userId}`,
        data
      );
      if (response.data.status === "ok") {
        setUserInfo((prevInfo) => ({ ...prevInfo, ...data }));
      } else {
        console.error(
          "Error updating user information:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateUserImage = async (imageData) => {
    try {
      const response = await axios.put(
        `http://localhost:3333/user/${userId}/image`,
        imageData
      );
      if (response.data.status === "ok") {
        fetchUserInfo(); 
      } else {
        console.error(
          "Error updating user image:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { fetchUserInfo, updateUserInfo, updateUserImage };
}

export default useInformationActions
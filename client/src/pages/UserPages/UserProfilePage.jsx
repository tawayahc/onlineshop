import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "../../components/User/UserLayout";
import UserDataComponent from "./UserDataComponent";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil/userInfo";
import useInformationActions from "../../API/userInformationAction";
import genericimageplaceholder from "../../assets/svg/generic-image-placeholder.svg";

const genderOptions = ["ชาย", "หญิง", "อื่นๆ"];

function UserProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const userID = localStorage.getItem("userId");
  const userInfo = useRecoilValue(userInfoState);
  const { fetchUserInfo, updateUserInfo, updateUserImage } =
    useInformationActions(userID);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    updateUserImage(formData).finally(() => {
      setEditMode(false);
      fetchUserInfo();
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const jsonData = {
      name: formData.get("name"),
      phoneNumber: formData.get("phoneNumber"),
      gender: formData.get("gender"),
    };

    updateUserInfo(jsonData).finally(() => {
      setEditMode(false);
      fetchUserInfo();
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setLoading(true);
    fetchUserInfo().finally(() => setLoading(false));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    setLoading(true);
    fetchUserInfo().finally(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   const fetchAndSetBlob = async () => {
  //     setLoading(true);
  //     const userInfoData = await fetchUserInfo();
  //     if (userInfoData && userInfoData[0] && userInfoData[0].Image) {
  //       const blob = new Blob([new Uint8Array(userInfoData[0].Image.data)], {
  //         type: userInfoData[0].Image.type || "image/jpeg", // or the appropriate image type
  //       });
  //       setBlobUrl(URL.createObjectURL(blob));
  //     }
  //     setLoading(false);
  //   };

  //   fetchAndSetBlob();
  // }, []);

  const genderCheck = (gender) => {
    if (gender === "M") {
      return "ชาย";
    } else if (gender === "F") {
      return "หญิง";
    } else {
      return "อื่นๆ";
    }
  };

  return (
    <div className="flex w-full">
      <div className="card w-full bg-primary card-bordered ">
        <div className="card-body ">
          <h2 className="card-title flex flex-col items-start">
            ข้อมูลส่วนตัว
            <div className="divider m-0"></div>
          </h2>
          {loading ? (
            <div className="flex justify-center h-24">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center">
                {/* <div className="avatar flex justify-center">
                  <div className="w-40 rounded-full">
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <img
                        src={
                          preview ||
                          // blobUrl ||
                          genericimageplaceholder
                        }
                        alt="Upload Icon"
                      />
                    </label>

                    <input
                      type="file"
                      name="image"
                      id="imageUpload"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div> */}
                {/* <div className="flex justify-center mt-2">
                  <button
                    className="btn btn-accent btn-outline"
                    type="button"
                    onClick={handleImageSubmit}
                  >
                    Upload Image
                  </button>
                </div> */}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <UserDataComponent
                    label="ชื่อ"
                    value={userInfo[0].FirstName + " " + userInfo[0].LastName}
                    editMode={editMode}
                    name="name"
                  />
                  <UserDataComponent
                    label="อีเมล"
                    value={userInfo[0].Email}
                    editMode={false}
                    name="email"
                  />
                  <UserDataComponent
                    label="เบอร์โทรศัพท์"
                    value={userInfo[0].PhoneNumber}
                    editMode={editMode}
                    name="phoneNumber"
                  />
                  <div className="grid grid-cols-3 items-center space-y-2">
                    <div>เพศ</div>
                    <div className="col-span-2 flex flex-row space-x-4 ">
                      {genderOptions.map((option, index) => (
                        <div key={index} className="form-control">
                          <label className="label cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value={option}
                              className="radio mr-4"
                              disabled={!editMode}
                              defaultChecked={
                                option === genderCheck(userInfo[0].Gender)
                              }
                            />
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-actions justify-end content-end">
                  {editMode ? (
                    <div className="flex flex-row">
                      <button
                        className="btn btn-error mr-4"
                        type="button"
                        onClick={handleCancel}
                      >
                        ยกเลิก
                      </button>
                      <button
                        className="btn btn-accent btn-outline btn-wide"
                        type="submit"
                      >
                        บันทึก
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-outline btn-error btn-wide"
                      type="button"
                      onClick={toggleEditMode}
                    >
                      แก้ไข
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <UserLayout>
      <UserProfilePage />
    </UserLayout>
  </Layout>
);

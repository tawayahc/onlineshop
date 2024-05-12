import React from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "../../components/User/UserLayout";

const fakeData = {
  name: "sara",
  email: "sara@gmail.com",
  phone: "0123456789",
  gender: "ชาย",
};
const userLabels = {
  name: "ชื่อ-นามสกุล",
  email: "อีเมล",
  phone: "หมายเลขโทรศัพท์",
};

const genderOptions = ["ชาย", "หญิง", "อื่นๆ"];

const userDataComponent = (data, index, editMode) => {
  const { label } = data;
  const value = fakeData[label];

  return (
    <div key={index} className="grid grid-cols-3 items-center space-y-2">
      <div>{userLabels[label]}</div>
      <div className="col-span-2">
        {editMode ? (
          <input
            type="text"
            placeholder={value}
            className="input input-bordered w-full max-w-xs"
          />
        ) : (
          <div className="col-span-2">
            <input
              type="text"
              placeholder={value}
              className="input input-bordered w-full max-w-xs "
              disabled
            />
          </div>
        )}
      </div>
    </div>
  );
};

function UserProfilePage() {
  const userLabelsList = Object.keys(userLabels);
  const [editMode, setEditMode] = React.useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEditClick = () => {
    toggleEditMode();
  }

  return (
    <div className="flex w-full">
      <div className="card w-full bg-primary card-bordered ">
        <div className="card-body ">
          <h2 className="card-title flex flex-col items-start">
            ข้อมูลส่วนตัว
            <div className="divider m-0"></div>
          </h2>
          <div className="flex flex-col">
            {userLabelsList.map((label, index) =>
              userDataComponent({ label }, index, editMode)
            )}
            <div className="grid grid-cols-3 items-center space-y-2">
              <div>เพศ</div>
              <div className="col-span-2 flex flex-row space-x-4 ">
                {genderOptions.map((option, index) => (
                  <div key={index} className="form-control">
                    <label className="label cursor-pointer">
                    {editMode ? (
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        className="radio radio-accent mr-4"
                      />
                    ): (
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        className="radio mr-4"
                        disabled
                        {...(option === fakeData.gender && { checked: true })}
                      />
                    )}
                    {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card-actions h-full justify-end content-end">
            {editMode ? (
              <button className="btn btn-accent btn-wide" onClick={toggleEditMode}>
                บันทึก
              </button>
            ) : (
              <button
                className="btn btn-outline btn-error btn-wide" 
                onClick={toggleEditMode}
              >
                แก้ไข
              </button>
            )}
          </div>
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

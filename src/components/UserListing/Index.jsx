import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Redux/features/Auth/userSlice";

const UserListing = ({setShowListing}) => {
  const { user } = useSelector((state) => state.user);
  console.log("userrrrrrr", user)
  const dispatch = useDispatch();

  const onDeleteHandler = (user) => {
    dispatch(deleteUser(user?.id));
  };
const onAddHandler = () => {
  setShowListing(true)
  };
  return (
    <div className="p-6">
      <div className="overflow-x-auto shadow-lg rounded-lg">
          <button
                  onClick={onAddHandler}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                >
                  Add User Info
                </button>
        <table className="w-full border border-gray-200 text-left text-sm text-gray-700">
  
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50 transition">
              <td className="px-6 py-3">{user?.userName}</td>
              <td className="px-6 py-3">{user?.email}</td>
              <td className="px-6 py-3">{user?.city}</td>
              <td className="px-6 py-3 text-center">
                <button
                  onClick={() => onDeleteHandler(user)}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListing;

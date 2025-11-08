import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useLogOutMutation } from "../features/user/userApi";
import {
  Camera,
  Check,
  Edit2,
  Mail,
  Phone,
  Shield,
  LogOut,
  Trash2,
  Crown,
} from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [logOut, { isLoading, isSuccess }] = useLogOutMutation();

  const user = useSelector(selectUser);

  const handleLogout = async (e) => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <div>not logged in...</div>;
  return (
    <div className="bg-page">
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="card mb-6 animate-fade-in">
          {/* cover bg */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-32 -m-6 mb-0 rounded-t-2xl"></div>
          <div className="flex flex-col md:flex-row -mt-16 px-6 pb-6 gap-6 items-start">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                alt="profile"
                className="w-32 h-32 border-4 border-white object-cover rounded-2xl shadow-xl"
              />
              <button className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity border-4 border-white flex items-center justify-center">
                <Camera className="h-6 w-6 text-slate-50" />
              </button>
            </div>

            <div className="flex-1 mt-4 md:mt-0 md:mb-0">
              <div className="flex items-start justify-around gap-4">
                <div>
                  <input
                    className={`text-3xl font-bold text-slate-800 w-full  ${isEditing ? "bg-slate-100 outline-1 outline-green-400" : "outline-none"}`}
                    value={user.name || "not set"}
                    disabled={!isEditing}
                  />
                  <p className="text-sm text-slate-600">
                    @{user?.username || "no-user"}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-ghost btn-sm flex items-center gap-2 cursor-pointer"
                >
                  {isEditing ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account info */}
        <div className="card animate-slide-up mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Account information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="icon-box-secondary">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 items-center flex-col">
                <p className="text-sm text-slate-600">Email Address</p>
                <p className="font-medium text-slate-800">
                  {user.email || "not set"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className=" icon-box-glass !bg-green-600/10">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 items-center flex-col">
                <p className="text-sm text-slate-600">Phone</p>
                <p className="font-medium text-slate-800">
                  {user.phone || "005678 - 5678"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl bg-violet-600/10 border-1 border-violet-600">
              <div className=" icon-box-glass !bg-violet-600/10">
                <Shield className="h-6 w-6 text-violet-600" />
              </div>
              <div className="flex-1 items-center flex-col">
                <p className="text-sm text-violet-600 font-bold">
                  Account Type
                </p>
                <p className="font-medium text-slate-800">
                  {user.role || "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* actions */}

        <div className="card animate-slide-up mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Actions</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="icon-box-glass ">
                <LogOut className="h-6 w-6 text-blue-800" />
              </div>
              <div className="flex-1 items-center flex-col">
                <p className="font-medium text-blue-800">Logout</p>
                <p className="text-sm text-slate-800">
                  Sign out of Your account
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary cursor-pointer"
              >
                LogOut
              </button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-red-100 border border-red-800 rounded-xl">
              <div className="icon-box-glass !bg-red-600/10">
                <Trash2 className=" h-6 w-6 text-red-800" />
              </div>
              <div className="flex-1 items-center flex-col">
                <p className="font-medium text-red-800">Delete</p>
                <p className="text-sm text-red-500">Delete your account</p>
              </div>
              <button className="btn-secondary !bg-gradient-to-r from-red-500 to-red-800 !shadow-xl !shadow-red-400 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

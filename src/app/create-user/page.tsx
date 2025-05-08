import UserFormComponent from "app/components/UserFormComponent";

export default function CreateUser() {
  return (
    <>
      <div className="text-center p-12">Create Account</div>
      <UserFormComponent></UserFormComponent>
      <div className="text-center p-12">
        <span className="text-xs">Already registered? </span>
        <span className="underline text-sm">Login here</span>
      </div>
    </>
  );
} 
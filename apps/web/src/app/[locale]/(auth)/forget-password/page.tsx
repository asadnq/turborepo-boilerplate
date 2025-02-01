import { ForgetPasswordForm } from './form';

export default function ForgetPassword() {
  return (
    <div className="max-w-[380px] sm:max-w-[450px] mx-auto my-auto flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl text-primary font-bold">Your App Name</h1>
      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <ForgetPasswordForm />
      </div>
    </div>
  );
}

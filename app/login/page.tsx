import SignInButton from "../_components/SignInButton";
import { signInAction } from "../_lib/actions";

export default function Page() {
  return (
    <form action={signInAction}>
      <div className="flex flex-col gap-10 mt-10 items-center">
        <h2 className="text-3xl font-semibold">
          Sign in to access your guest area
        </h2>
        <SignInButton />
      </div>
    </form>
  );
}

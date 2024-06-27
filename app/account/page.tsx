import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest area",
};

export default function Page() {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, user
      </h2>
    </div>
  );
}

import Login from "@/app/components/auth/Login";

export const metadata = {
  title: "Login To Access Your Automotive Web Solutions Dashboard",
  description:
    "Already registered? Log in to manage your dealership website, update listings, and take control of your online presence.",
};
export default function Register() {
  return (
    <main>
      <Login/>
    </main>
  );
}

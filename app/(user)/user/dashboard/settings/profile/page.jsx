import { Button, Label, TextInput } from "flowbite-react";
import Image from "next/image";

export default function UserProfile() {
  return (
    <div>
      <div className="bg-white border-b">
        <h2 className="font-semibold text-xl">Manage Profile</h2>
      </div>
      <div className="flex items-center justify-center p-4 bg-white">
        <div className="w-full md:w-[70%]">
          <div className="flex items-center justify-center">
            <div className="w-[180px] h-[180px] p-2 object-cover overflow-hidden shadow rounded-full flex items-center justify-center">
              <Image
                src={"/logo.png"}
                alt="profile-img"
                width={150}
                height={150}
                className="size-full object-contain"
              />
            </div>
          </div>
          <form className="my-3 flex flex-col gap-3">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput
                type="text"
                id="name"
                defaultValue={"Sysfoc"}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                type="email"
                id="email"
                defaultValue={"sysfoc@gmail.com"}
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <TextInput
                type="tel"
                id="phone"
                defaultValue={"111-234-567"}
                placeholder="111-234-567"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                type="password"
                id="password"
                defaultValue={"12345678"}
                placeholder="*******"
              />
            </div>
            <div>
              <Button type="submit" color="blue" className="mt-3 w-full">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

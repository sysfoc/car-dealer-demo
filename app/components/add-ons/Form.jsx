import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React from "react";

const Form = () => {
  return (
    <section className="my-14 py-10 bg-white">
      <div className="mx-4 md:mx-16">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">
            Not Mentioned! What You Are Looking For? Contact Us Now
          </h3>
          <p className="mt-1">
            Add-ons are additional services that you can purchase to enhance
            your website
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full md:w-[80%]">
            <div className="flex flex-col gap-5 mt-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full"
                  autoComplete="on"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="john@gmail.com"
                  className="w-full"
                  autoComplete="on"
                />
              </div>
              <div>
                <Label htmlFor="suggestion">Addons Suggestion</Label>
                <Textarea
                  id="suggestion"
                  placeholder="Write your suggestion here"
                  className="w-full"
                  rows={5}
                />
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit" color="blue" size="md">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;

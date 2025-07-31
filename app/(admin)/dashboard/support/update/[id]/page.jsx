"use client";
import {
  Alert,
  Button,
  Card,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateSupport() {
  const params = useParams();
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getIssueById = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/user/support/get-single-issue/${params.id}`
      );
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setError(false);
        setIssue(data.issue);
        setLoading(false);
      } else {
        setError(true);
        setErrorMessage(data.message);
        setLoading(false);
      }
    };
    getIssueById();
  }, [params.id]);

  const handleChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`/api/user/support/update/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue),
    });
    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      router.push("/dashboard/support");
    } else {
      setError(true);
      setErrorMessage(data.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      {loading ? (
        <Spinner size='xl' />
      ) : (
        <Card className='w-full max-w-xl p-6 shadow-lg'>
          {error && (
            <Alert color='failure'>
              <span>
                <span className='font-medium'>{errorMessage}</span>
              </span>
            </Alert>
          )}
          <h2 className='text-2xl font-bold text-gray-800 text-center mb-3'>
            Update Support
          </h2>
          <div>
            <form className='space-y-3' onSubmit={handleFormSubmit}>
              <div className='flex flex-col gap-1'>
                <Label htmlFor='subject'>Subject</Label>
                <TextInput
                  readOnly
                  id='subject'
                  name='subject'
                  placeholder='subject'
                  defaultValue={issue?.subject}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name='description'
                  readOnly
                  rows={4}
                  placeholder='description'
                  defaultValue={issue?.description}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Label htmlFor='message'>Status</Label>
                <Select
                  name='status'
                  id='status'
                  defaultValue={issue?.status}
                  onChange={handleChange}
                >
                  <option disabled={issue?.status === "Open"} value={"Open"}>
                    Open
                  </option>
                  <option
                    disabled={issue?.status === "Closed"}
                    value={"Closed"}
                  >
                    Closed
                  </option>
                </Select>
              </div>
              <div className='flex flex-col gap-1'>
                <Label htmlFor='reply'>Reply</Label>
                <Textarea
                  id='reply'
                  name='reply'
                  rows={4}
                  required
                  onChange={handleChange}
                  placeholder='Your issue has resolved. Thank you for your patience.'
                />
              </div>
              <div className='mt-3 flex flex-col'>
                <Button type='submit' className="!bg-[#182641] hover:!bg-[#182641]/90">Update</Button>
              </div>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}

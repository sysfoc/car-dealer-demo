"use client";
import { Button, Label, TextInput, Card, Select, Alert } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateCurrency() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currencyDetails, setCurrencyDetails] = useState({});
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const getCurrencyByParams = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/payment/currencies/get/${params.id}`
        );
        const data = await response.json();
        setLoading(false);
        if (response.ok) {
          setCurrencyDetails(data.currency);
        } else {
          setLoading(false);
          setError(true);
          setErrorMessage(data.message);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
        setErrorMessage(error.message);
      }
    };
    getCurrencyByParams();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `/api/payment/currencies/update/${currencyDetails._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setError(false);
        setSuccess(true);
        setSuccessMessage(data.message);
        router.push("/dashboard/currencies");
        setFormData({});
      } else {
        setLoading(false);
        setSuccess(false);
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-2xl p-4 shadow-lg'>
        {success && (
          <Alert color='success'>
            <span className='block sm:inline'>{successMessage}</span>
          </Alert>
        )}
        {error && (
          <Alert color='failure'>
            <span className='block sm:inline'>{errorMessage}</span>
          </Alert>
        )}
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
          Update Currency
        </h2>
        <form className='space-y-4' onSubmit={handleSubmitForm}>
          <div>
            <Label htmlFor='name' value='Name' />
            <TextInput
              id='name'
              type='text'
              name='name'
              placeholder='Pakistan'
              required
              defaultValue={currencyDetails.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='country' value='Short Code' />
            <TextInput
              id='country'
              type='text'
              name='country'
              placeholder='PK'
              required
              defaultValue={currencyDetails.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='currency' value='Currency' />
            <TextInput
              id='currency'
              type='text'
              name='currency'
              placeholder='PKR'
              required
              defaultValue={currencyDetails.currency}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='symbol' value='Symbol' />
            <TextInput
              id='symbol'
              name='symbol'
              required
              placeholder='PKR, $ etc'
              defaultValue={currencyDetails.symbol}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='price' value='Price' />
            <TextInput
              id='price'
              name='number'
              required
              placeholder='283.92'
              defaultValue={currencyDetails.price}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-end'>
            <Button
              disabled={loading}
              type='submit'
              className='w-full !bg-[#182641] hover:!bg-[#182641]/90'
            >
              Update Currency
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

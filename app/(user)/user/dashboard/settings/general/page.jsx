"use client";
import { Alert, Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function GeneralSettings() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    currency: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getUserSettings = async () => {
      try {
        const res = await fetch("/api/user/get/settings");
        const data = await res.json();
        if (res.ok) {
          setFormData({
            location: data.settings.location,
            currency: data.settings.currency,
          });
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    };
    getUserSettings();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setLoading(false);
        setSuccess(true);
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <section>
      <h1 className='text-2xl font-bold'>General Settings</h1>
      <div>
        <form onSubmit={handleFormSubmission}>
          {error && <Alert color='failure'>{errorMessage}</Alert>}
          {success && <Alert color='success'>{successMessage}</Alert>}
          <div className='my-3 flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='currency' value='Set default currency' />
              <Select id='currency' defaultValue='USD' onChange={handleChange}>
                <option selected={formData.currency === "AUD"} value='AUD'>
                  AUD
                </option>
                <option selected={formData.currency === "AED"} value='AED'>
                  AED
                </option>
                <option selected={formData.currency === "EUR"} value='EUR'>
                  EUR
                </option>
                <option selected={formData.currency === "SAR"} value='SAR'>
                  SAR
                </option>
                <option selected={formData.currency === "CAD"} value='CAD'>
                  CAD
                </option>
                <option selected={formData.currency === "FJD"} value='FJD'>
                  FJD
                </option>
                <option selected={formData.currency === "NZD"} value='NZD'>
                  NZD
                </option>
                <option selected={formData.currency === "GBP"} value='GBP'>
                  GBP
                </option>
                <option selected={formData.currency === "USD"} value='USD'>
                  USD
                </option>
              </Select>
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='location' value='Update location' />
              <TextInput
                id='location'
                placeholder='Pakistan, USA, Australia'
                defaultValue={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='mt-5'>
            <Button
              disabled={loading}
              type='submit'
              className='w-full bg-[#fa7123] hover:!bg-[#fa7123]'
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

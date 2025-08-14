"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import Link from "next/link";
import {
  Modal,
  Button,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Alert,
} from "flowbite-react";
import { FaTrash } from "react-icons/fa6";

export default function Currencies() {
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [getAllCurrencies, setGetAllCurrencies] = useState([]);
  const [isShowCurrencyModal, setIsShowCurrencyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/payment/currencies");
        const data = await response.json();
        setGetAllCurrencies(data.currencies || []);
      } catch (error) {
        setLoading(false);
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleShowCurrencyModal = (currency) => {
    setSelectedCurrency(currency);
    setIsShowCurrencyModal(true);
  };

  const handleDeleteUser = async (id) => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this currency?"
    );
    if (!isConfirmed) return;
    try {
      const res = await fetch(`/api/payment/currencies/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setError(false);
        setErrorMessage("");
        setGetAllCurrencies((prevCurrencies) =>
          prevCurrencies.filter((currency) => currency._id !== id)
        );
      } else {
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className='my-5 p-5 bg-white shadow'>
      {error && (
        <Alert color='failure' className='absolute top-5 right-5'>
          <span>
            <span className='font-medium'>{errorMessage}</span>
          </span>
        </Alert>
      )}
      <div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold mb-4'>Currencies List</h2>
          <div className='mb-3'>
            <Link href='/dashboard/currencies/add'>
              <Button size='sm' className='bg-[#e56c16] hover:!bg-[#e56c16]/90'>
                Add Currency
              </Button>
            </Link>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Country name
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Short Name
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Currency
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Symbol
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Price
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Actions
            </TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'>
            {loading && (
              <TableRow>
                <TableCell colSpan={7} className='text-center'>
                  <Spinner
                    size='lg'
                    aria-label='Center-aligned spinner example'
                  />
                </TableCell>
              </TableRow>
            )}
            {getAllCurrencies.map((currency) => (
              <TableRow key={currency._id}>
                <TableCell className='capitalize'>{currency.name}</TableCell>
                <TableCell>{currency.country}</TableCell>
                <TableCell className='capitalize'>
                  {currency.currency}
                </TableCell>
                <TableCell className='capitalize'>{currency.symbol}</TableCell>
                <TableCell className='capitalize'>{currency.price}</TableCell>
                <TableCell>
                  <div key={currency?._id} className='flex items-center gap-2'>
                    <button
                      className='p-2 bg-[#182641] hover:!bg-[#182641]/90 text-white rounded'
                      title='View'
                      onClick={() => handleShowCurrencyModal(currency)}
                    >
                      <FaEye className='w-3 h-3' />
                    </button>
                    <Link
                      href={`/dashboard/currencies/update/${currency?._id}`}
                    >
                      <button
                        className='p-2 bg-green-500 hover:!bg-green-600 text-white rounded'
                        title='Edit'
                      >
                        <FaEdit className='w-3 h-3' />
                      </button>
                    </Link>
                    <button
                      className='p-2 bg-red-600 text-white rounded hover:bg-red-700'
                      title='Delete'
                      onClick={() => handleDeleteUser(currency._id)}
                    >
                      <FaTrash className='w-3 h-3' />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal
          show={isShowCurrencyModal}
          onClose={() => setIsShowCurrencyModal(false)}
        >
          <Modal.Header>{selectedCurrency?.name} Currency</Modal.Header>
          <Modal.Body>
            <div>
              <p>
                <span className='text-[#182641] font-semibold'>Country:</span>{" "}
                {selectedCurrency?.country}
              </p>
              <p>
                <span className='text-[#182641] font-semibold'>Currency:</span>{" "}
                {selectedCurrency?.currency}
              </p>
              <p>
                <span className='text-[#182641] font-semibold'>Symbol:</span>{" "}
                {selectedCurrency?.symbol}
              </p>
              <p>
                <span className='text-[#182641] font-semibold'>Price:</span>{" "}
                {selectedCurrency?.price}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsShowCurrencyModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

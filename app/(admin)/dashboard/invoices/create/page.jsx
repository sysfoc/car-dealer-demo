"use client";
import { useState } from "react";
import {
  Label,
  Select,
  Table,
  TableHead,
  Textarea,
  TextInput,
  TableHeadCell,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "flowbite-react";
import { FaTrash } from "react-icons/fa6";

export default function CreateInvoices() {
  const [items, setItems] = useState([
    { id: 1, description: "", quantity: 1, price: "" },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, description: "", quantity: 1, price: "" },
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  return (
    <main>
      <div>
        <h1 className='text-xl font-semibold'>New Invoice</h1>
      </div>
      <div className='shadow bg-white p-5 my-3'>
        <form>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='invoice-id'>Invoice ID</Label>
              <TextInput type='text' placeholder='E.g. #JAN-2345' required />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='invoice-status'>Status</Label>
              <Select id='invoice-status'>
                <option>Select</option>
                <option value='paid'>Paid</option>
                <option value='unpaid'>Unpaid</option>
                <option value='cancelled'>Cancelled</option>
              </Select>
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='invoice-date'>Date</Label>
              <TextInput type='date' id='invoice-date' required />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='invoice-dueDate'>Due Date</Label>
              <TextInput type='date' id='invoice-dueDate' required />
            </div>
            <div>
              <Label htmlFor='invoice-from'>From</Label>
              <Textarea
                id='invoice-from'
                placeholder='Olivia John
                olivia@trezo.com
                4545 Seth Street Ballinger, TX 78965
                +1 444 556 8899'
                rows={5}
                required
              />
            </div>
            <div>
              <Label htmlFor='invoice-to'>To</Label>
              <Textarea id='invoice-to' rows={5} required />
            </div>
          </div>
          <div className='mt-5'>
            <Table>
              <TableHead>
                <TableHeadCell>No</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <TableHeadCell>Quantity</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>Total</TableHeadCell>
                <TableHeadCell>Action</TableHeadCell>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Label
                        htmlFor={`item-description-${item.id}`}
                        className='sr-only'
                      >
                        Description
                      </Label>
                      <TextInput
                        id={`item-description-${item.id}`}
                        type='text'
                        placeholder='Enter item name'
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Label
                        htmlFor={`item-quantity-${item.id}`}
                        className='sr-only'
                      >
                        Quantity
                      </Label>
                      <TextInput
                        id={`item-quantity-${item.id}`}
                        type='number'
                        min={1}
                        max={10}
                        defaultValue={1}
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Label
                        htmlFor={`item-price-${item.id}`}
                        className='sr-only'
                      >
                        Price
                      </Label>
                      <TextInput
                        id={`item-price-${item.id}`}
                        type='number'
                        placeholder='Enter price'
                        required
                      />
                    </TableCell>
                    <TableCell>$0.0</TableCell>
                    <TableCell>
                      <button
                        className='p-2 bg-red-500 text-white rounded hover:bg-red-600'
                        title='Delete'
                        onClick={() => removeItem(item.id)}
                      >
                        <FaTrash className='w-3 h-3' />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className='mt-3'>
              <Button color='blue' onClick={addItem}>
                Add Item
              </Button>
            </div>
          </div>
          <div>
            <div className='mt-5 flex items-center justify-center'>
              <Button type='submit' color='blue'>
                Create Invoice
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

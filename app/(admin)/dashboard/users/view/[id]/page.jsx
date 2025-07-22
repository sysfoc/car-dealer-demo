"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function viewUser() {
  const params = useParams();
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserRecords = async () => {
      setLoading(true);
      const res = await fetch(`/api/user/get/record/${params.id}`);
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setLoading(false);
        setRecord(data.record);
      } else {
        setLoading(false);
        alert(data.message);
      }
    };
    getUserRecords();
  }, []);
  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500'></div>
        </div>
      ) : (
        <section className='my-5 flex flex-col gap-5'>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div className='flex items-center justify-between gap-4'>
              <div className='w-[120px] h-[120px] rounded-full overflow-hidden'>
                <Image
                  src={`${record?.user?.profileImg || "/logo.png"}`}
                  alt='user'
                  width={120}
                  height={120}
                  className='size-full object-contain'
                />
              </div>
              <div className='text-end'>
                <h1 className='text-xl font-semibold capitalize'>
                  {record?.user?.name}
                </h1>
                <p className='text-gray-500 text-sm'>{record?.user?.email}</p>
                <div className='mt-2 flex items-center justify-end gap-2'>
                  <span className='text-sm bg-green-100 px-2 py-1 text-green-500 font-semibold rounded capitalize'>
                    {record?.user?.role}
                  </span>
                  <span className='text-sm bg-green-100 px-2 py-1 text-green-500 font-semibold rounded capitalize'>
                    {record?.user?.isVerified === true
                      ? "Verified"
                      : "Unverified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Domains</h2>
            </div>
            <Table className='mt-4' striped>
              <TableHead>
                <TableHeadCell>Domain</TableHeadCell>
                <TableHeadCell>Registrar</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
                <TableHeadCell>Password</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
              </TableHead>
              <TableBody>
                {record?.domain?.length > 0 ? (
                  record?.domain?.map((domain) => (
                    <TableRow key={domain._id}>
                      <TableCell>{domain.domainName}</TableCell>
                      <TableCell>{domain.domainRegistrar}</TableCell>
                      <TableCell>{domain.domainUsername}</TableCell>
                      <TableCell>{domain.domainPassword}</TableCell>
                      <TableCell>{domain.domainStatus}</TableCell>
                      <TableCell>
                        {new Date(domain.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      No domains found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Billing Details</h2>
            </div>
            <Table className='mt-4' striped>
              <TableHead>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Address</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
              </TableHead>
              <TableBody>
                {record?.billing ? (
                  <TableRow key={record._id}>
                    <TableCell>{record.billing.fullName}</TableCell>
                    <TableCell>{record.billing.email}</TableCell>
                    <TableCell>${record.billing.address}</TableCell>
                    <TableCell>{record.billing.phone}</TableCell>
                    <TableCell>
                      {new Date(record.billing.createdAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      No billing details found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Payment History</h2>
            </div>
            <Table className='mt-4' striped>
              <TableHead>
                <TableHeadCell>Payment ID</TableHeadCell>
                <TableHeadCell>Product</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>Duration</TableHeadCell>
                <TableHeadCell>Method</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
              </TableHead>
              <TableBody>
                {record?.payments?.length > 0 ? (
                  record?.payments?.map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell>{payment.paymentId}</TableCell>
                      <TableCell>{payment.product}</TableCell>
                      <TableCell>${payment.productPrice}</TableCell>
                      <TableCell>{payment.productPlan}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      No payment history found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Subscriptions</h2>
            </div>
            <Table className='mt-4' striped>
              <TableHead>
                <TableHeadCell>Product</TableHeadCell>
                <TableHeadCell>Duration</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Subscribed At</TableHeadCell>
                <TableHeadCell>Expired At</TableHeadCell>
              </TableHead>
              <TableBody>
                {record?.subscription?.length > 0 ? (
                  record?.subscription?.map((subscription) => (
                    <TableRow key={subscription._id}>
                      <TableCell>{subscription?.subscriptionType}</TableCell>
                      <TableCell>{subscription?.subscriptionPlan}</TableCell>
                      <TableCell>
                        {subscription?.isActive === true
                          ? "Active"
                          : "Inactive"}
                      </TableCell>
                      <TableCell>
                        {new Date(subscription?.startDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(subscription?.endDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      No subscriptions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Themes</h2>
            </div>
            <div>
              <Table className='mt-4' striped>
                <TableHead>
                  <TableHeadCell>Theme name</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Subscribed At</TableHeadCell>
                  <TableHeadCell>Expired At</TableHeadCell>
                </TableHead>
                <TableBody>
                  {record?.subscription &&
                  record?.subscription[0]?.themes?.length > 0 ? (
                    record?.subscription[0]?.themes?.map((theme) => (
                      <TableRow key={theme?._id}>
                        <TableCell>{theme?.themeName}</TableCell>
                        <TableCell>
                          {theme?.isActive === true ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell>
                          {new Date(theme?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(theme?.expiredAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className='text-center'>
                        No Themes found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Refund History</h2>
            </div>
            <Table className='mt-4' striped>
              <TableHead>
                <TableHeadCell>Order Id</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Amount</TableHeadCell>
                <TableHeadCell>Reason</TableHeadCell>
                <TableHeadCell>Method</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
              </TableHead>
              <TableBody>
                {record?.refunds?.length > 0 ? (
                  record?.refunds?.map((refund) => (
                    <TableRow key={refund._id}>
                      <TableCell>{refund?.orderId}</TableCell>
                      <TableCell>{refund?.email}</TableCell>
                      <TableCell>{refund?.amount}</TableCell>
                      <TableCell>{refund?.reason}</TableCell>
                      <TableCell>{refund?.refundMethod}</TableCell>
                      <TableCell>{refund?.status}</TableCell>
                      <TableCell>
                        {new Date(refund?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className='text-center'>
                      No refund history found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Support Tickets</h2>
            </div>
            <Table className='mt-4' striped>
              <TableHead>
                <TableHeadCell>Subject</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Reply</TableHeadCell>
                <TableHeadCell>Created At</TableHeadCell>
              </TableHead>
              <TableBody>
                {record?.support?.length > 0 ? (
                  record?.support?.map((support) => (
                    <TableRow key={support._id}>
                      <TableCell>{support?.subject}</TableCell>
                      <TableCell>{support?.description}</TableCell>
                      <TableCell>{support?.status}</TableCell>
                      <TableCell>{support?.reply}</TableCell>
                      <TableCell>
                        {new Date(support?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      No support tickets found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
}

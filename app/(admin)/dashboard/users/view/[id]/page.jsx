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
      try {
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
      } catch (error) {
        alert(error.message);
        setLoading(false);
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
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <div className='w-[120px] h-[120px] rounded-full overflow-hidden'>
                <Image
                  src={`${record?.user?.profileImg || "/logo.png"}`}
                  alt={`${record?.user?.name} profile image` || "profile image"}
                  title={record?.user?.name}
                  width={120}
                  height={120}
                  priority
                  fetchPriority='high'
                  className='size-full object-contain'
                />
              </div>
              <div className='text-end'>
                <div className='mb-2 flex items-center justify-end gap-2'>
                  {record?.user?.role === "admin" ? (
                    <span className='text-xs bg-green-100 px-2 py-1 text-green-500 font-semibold rounded capitalize'>
                      Admin
                    </span>
                  ) : (
                    <span className='text-xs bg-yellow-100 px-2 py-1 text-yellow-500 font-semibold rounded capitalize'>
                      User
                    </span>
                  )}
                  {record?.user?.isVerified === true ? (
                    <span className='text-xs bg-green-100 px-2 py-1 text-green-500 font-semibold rounded capitalize'>
                      Verified
                    </span>
                  ) : (
                    <span className='text-xs bg-red-100 px-2 py-1 text-red-500 font-semibold rounded capitalize'>
                      Not Verified
                    </span>
                  )}
                </div>
                <h1 className='text-xl font-semibold capitalize'>
                  {record?.user?.name}
                </h1>
                <p className='text-gray-500 text-sm'>{record?.user?.email}</p>
                <p className='text-gray-500 text-sm'>
                  Last logged in using{" "}
                  <span className='capitalize text-green-500'>
                    {record?.user?.signupMethod}
                  </span>
                </p>
                <p className='text-gray-500 text-sm'>
                  Joined:{" "}
                  {new Date(record?.user?.createdAt).toLocaleDateString(
                    "en-US",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Domains</h2>
            </div>
            <div className='overflow-x-auto'>
              <Table className='mt-4' striped>
                <TableHead>
                  <TableHeadCell>Domain</TableHeadCell>
                  <TableHeadCell>Registrar</TableHeadCell>
                  <TableHeadCell>Username</TableHeadCell>
                  <TableHeadCell>Password</TableHeadCell>
                  <TableHeadCell>Custom Domain</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Date</TableHeadCell>
                </TableHead>
                <TableBody>
                  {record?.domain?.length > 0 ? (
                    record?.domain?.map((domain) => (
                      <TableRow key={domain._id}>
                        <TableCell title={domain.domainName}>
                          {domain.domainName}
                        </TableCell>
                        <TableCell title={domain.domainRegistrar}>
                          {domain.domainRegistrar}
                        </TableCell>
                        <TableCell title={domain.domainUsername}>
                          {domain.domainUsername}
                        </TableCell>
                        <TableCell title={domain.domainPassword}>
                          {domain.domainPassword}
                        </TableCell>
                        <TableCell title={domain?.customDomain}>
                          {domain?.customDomain}
                        </TableCell>
                        <TableCell title={domain.domainStatus}>
                          {domain.domainStatus}
                        </TableCell>
                        <TableCell title={domain.createdAt}>
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
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Payment History</h2>
            </div>
            <div className='overflow-x-auto'>
              <Table className='mt-4' striped>
                <TableHead>
                  <TableHeadCell>Customer ID</TableHeadCell>
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
                        <TableCell title={payment.customerId}>
                          {payment.customerId}
                        </TableCell>
                        <TableCell title={payment.paymentId}>
                          {payment.paymentId}
                        </TableCell>
                        <TableCell title={payment.product}>
                          {payment.product}
                        </TableCell>
                        <TableCell title={payment.productPrice}>
                          ${payment.productPrice}
                        </TableCell>
                        <TableCell title={payment.productPlan}>
                          {payment.productPlan}
                        </TableCell>
                        <TableCell title={payment.paymentMethod}>
                          {payment.paymentMethod}
                        </TableCell>
                        <TableCell title={payment.createdAt}>
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
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Subscriptions</h2>
            </div>
            <div className='overflow-x-auto'>
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
                        <TableCell title={subscription?.subscriptionType}>
                          {subscription?.subscriptionType}
                        </TableCell>
                        <TableCell title={subscription?.subscriptionPlan}>
                          {subscription?.subscriptionPlan}
                        </TableCell>
                        <TableCell
                          title={
                            subscription?.isActive === true
                              ? "Active"
                              : "Inactive"
                          }
                        >
                          {subscription?.isActive === true
                            ? "Active"
                            : "Inactive"}
                        </TableCell>
                        <TableCell title={subscription?.startDate}>
                          {new Date(subscription?.startDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </TableCell>
                        <TableCell title={subscription?.endDate}>
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
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Themes</h2>
            </div>
            <div className='overflow-x-auto'>
              <Table className='mt-4' striped>
                <TableHead>
                  <TableHeadCell>Theme name</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Current Status</TableHeadCell>
                  <TableHeadCell>Subscribed At</TableHeadCell>
                  <TableHeadCell>Expired At</TableHeadCell>
                </TableHead>
                <TableBody>
                  {record?.subscription &&
                  record?.subscription[0]?.themes?.length > 0 ? (
                    record?.subscription[0]?.themes?.map((theme) => (
                      <TableRow key={theme?._id}>
                        <TableCell title={theme?.themeName}>
                          {theme?.themeName}
                        </TableCell>
                        <TableCell
                          title={
                            theme?.isActive === true ? "Active" : "Inactive"
                          }
                        >
                          {theme?.isActive === true ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell
                          title={
                            theme?.activeTheme === true ? "Live" : "Disabled"
                          }
                        >
                          {theme?.activeTheme === true ? "Live" : "Disabled"}
                        </TableCell>
                        <TableCell title={theme?.createdAt}>
                          {new Date(theme?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell title={theme?.expiredAt}>
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
              <h2 className='text-lg font-semibold'>Add-ons</h2>
            </div>
            <div className='overflow-x-auto'>
              <Table className='mt-4' striped>
                <TableHead>
                  <TableHeadCell>Addon</TableHeadCell>
                  <TableHeadCell>Price</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Current Status</TableHeadCell>
                  <TableHeadCell>Subscribed At</TableHeadCell>
                  <TableHeadCell>Expired At</TableHeadCell>
                </TableHead>
                <TableBody>
                  {record?.subscription && record?.addons?.length > 0 ? (
                    record?.addons?.map((addon) => (
                      <TableRow key={addon?._id}>
                        <TableCell title={addon?.serviceName}>
                          {addon?.serviceName}
                        </TableCell>
                        <TableCell title={addon?.servicePrice}>
                          ${addon?.servicePrice}
                        </TableCell>
                        <TableCell
                          title={
                            addon?.isActive === true ? "Active" : "Inactive"
                          }
                        >
                          {addon?.isActive === true ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell
                          title={
                            addon?.activeAddon === true ? "Live" : "Disabled"
                          }
                        >
                          {addon?.activeAddon === true ? "Live" : "Disabled"}
                        </TableCell>
                        <TableCell title={addon?.subscribedAt}>
                          {new Date(addon?.subscribedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell title={addon?.expiredAt}>
                          {new Date(addon?.expiredAt).toLocaleDateString(
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
                        No Addon found
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
            <div className='overflow-x-auto'>
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
                        <TableCell title={refund?.orderId}>
                          {refund?.orderId}
                        </TableCell>
                        <TableCell title={refund?.email}>
                          {refund?.email}
                        </TableCell>
                        <TableCell title={refund?.amount}>
                          ${refund?.amount}
                        </TableCell>
                        <TableCell title={refund?.reason}>
                          {refund?.reason}
                        </TableCell>
                        <TableCell title={refund?.refundMethod}>
                          {refund?.refundMethod}
                        </TableCell>
                        <TableCell title={refund?.status}>
                          {refund?.status}
                        </TableCell>
                        <TableCell title={refund?.createdAt}>
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
          </div>
          <div className='bg-white px-5 py-4 rounded-md shadow'>
            <div>
              <h2 className='text-lg font-semibold'>Support Tickets</h2>
            </div>
            <div className='overflow-x-auto'>
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
                        <TableCell title={support?.subject}>
                          {support?.subject}
                        </TableCell>
                        <TableCell title={support?.description}>
                          {support?.description}
                        </TableCell>
                        <TableCell title={support?.status}>
                          {support?.status}
                        </TableCell>
                        <TableCell title={support?.reply}>
                          {support?.reply}
                        </TableCell>
                        <TableCell title={support?.createdAt}>
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
          </div>
        </section>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card,
  TableHead,
  TableHeadCell,
  Spinner,
} from "flowbite-react";

export default function ProfileSecurity() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAlertsNotifications = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/notifications/get-notifications");
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
          setAuditLogs(data.notifications);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getAlertsNotifications();
  }, []);
  return (
    <div className='space-y-6'>
      <Card>
        <h2 className='text-xl font-semibold'>Audit Logs</h2>
        <Table striped className='mt-4'>
          <TableHead>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Activity</TableHeadCell>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={2} className='text-center'>
                  <Spinner size='lg' className='rotate mx-auto' />
                </TableCell>
              </TableRow>
            )}
            {!loading && auditLogs.length > 0 ? (
              auditLogs.map((log) => (
                <TableRow key={log?.id}>
                  <TableCell>
                    {new Date(log?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date(log?.createdAt)
                      .toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .toLowerCase()}
                  </TableCell>
                  <TableCell>{log?.title}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className='text-center'>
                  No audit logs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <Card>
        <h2 className='text-xl font-semibold'>Data Privacy & Compliance</h2>
        <p className='text-gray-600 mt-2'>
          We comply with GDPR and other regulations to ensure your billing data
          is secure.
        </p>
      </Card>
    </div>
  );
}

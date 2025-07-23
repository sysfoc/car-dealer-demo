"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";

export default function Domains() {
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState([]);
  useEffect(() => {
    const getDomains = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/domain/get-all");
        const data = await response.json();
        setLoading(false);
        setDomains(data.domains);
      } catch (error) {
        console.error(error);
      }
    };
    getDomains();
  }, []);
  return (
    <section className='my-5'>
      <h1 className='text-2xl font-bold'>Domain records</h1>
      <div className='overflow-x-auto mt-5'>
        <Table>
          <TableHead>
            <TableHeadCell>Domain</TableHeadCell>
            <TableHeadCell>Registrar</TableHeadCell>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Password</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
          </TableHead>
          <TableBody>
            {domains.map((domain) => {
              return (
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
                  <TableCell title={domain.createdAt}>
                    {new Date(domain.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

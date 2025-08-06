"use client";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";

export default function Domains() {
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredResults = searchTerm
    ? domains.filter((domain) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          domain?._id?.toLowerCase()?.includes(lowerSearch) ||
          domain?.domainName?.toLowerCase()?.includes(lowerSearch) ||
          domain?.domainRegistrar?.toLowerCase()?.includes(lowerSearch) ||
          domain?.domainUsername?.toLowerCase()?.includes(lowerSearch) ||
          domain?.domainPassword?.toLowerCase()?.includes(lowerSearch) ||
          domain?.customDomain?.toLowerCase()?.includes(lowerSearch)
        );
      })
    : domains;
  return (
    <section className='my-5'>
      <div className='flex flex-wrap items-center justify-between mb-5'>
        <h1 className='text-2xl font-bold'>Domain records</h1>
        <TextInput
          id='search'
          type='search'
          placeholder='Search'
          className='w-[300px]'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='overflow-x-auto mt-5'>
        <Table>
          <TableHead>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Domain
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Registrar
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Username
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Password
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Custom Domain
            </TableHeadCell>
            <TableHeadCell className='!bg-[#182641] text-white'>
              Date
            </TableHeadCell>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  <Spinner color='info' />
                </TableCell>
              </TableRow>
            )}
            {filteredResults.map((domain) => {
              return (
                <TableRow key={domain._id}>
                  <TableCell title={domain.domainName}>
                    {domain.domainName || "-----"}
                  </TableCell>
                  <TableCell title={domain.domainRegistrar}>
                    {domain.domainRegistrar || "-----"}
                  </TableCell>
                  <TableCell title={domain.domainUsername}>
                    {domain.domainUsername || "-----"}
                  </TableCell>
                  <TableCell title={domain.domainPassword}>
                    {domain.domainPassword || "-----"}
                  </TableCell>
                  <TableCell title={domain.customDomain}>
                    {domain.customDomain || "-----"}
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
            }) || (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  No domains found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

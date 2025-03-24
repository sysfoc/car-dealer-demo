"use client";
import {
  Label,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ToggleSwitch,
} from "flowbite-react";

export default function ProfileSecurity() {
  return (
    <div>
      <div className="bg-white border-b p-4">
        <h2 className="font-semibold text-xl">Manage Account</h2>
      </div>
      <div className="p-4 bg-white">
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="read-only">
              Make the account read-only for other users, other than you
            </Label>
            <ToggleSwitch id="read-only" checked sizing="sm" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="read-only">
              Other users can add add or delete payment methods?
            </Label>
            <ToggleSwitch id="read-only" sizing="sm" />
          </div>
          <div>
            <div className="border-y">
              <h3 className="font-semibold my-2">List of Logged-in users</h3>
            </div>
            <div>
              <Table striped>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <span className="text-xs">john@gmail.com</span>
                    </TableCell>
                    <TableCell>
                      <span className="p-1 text-green-500 bg-green-200 text-xs rounded-lg">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="text-xs">john@gmail.com</span>
                    </TableCell>
                    <TableCell>
                      <span className="p-1 text-green-500 bg-green-200 text-xs rounded-lg">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-y p-4">
        <h2 className="font-semibold text-xl">Manage Security</h2>
      </div>
      <div className="p-4 bg-white">
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="otp-gmail">Send OTP message through email</Label>
            <ToggleSwitch id="otp-gmail" checked sizing="sm" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="otp-phone">
              Send OTP message through Mobile Number
            </Label>
            <ToggleSwitch id="otp-phone" sizing="sm" />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <Label htmlFor="2f-auth">Enable 2 Factor Authentication</Label>
              <p className="text-xs">
                (This service is available for mobile app users only)
              </p>
            </div>
            <ToggleSwitch id="2f-auth" sizing="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

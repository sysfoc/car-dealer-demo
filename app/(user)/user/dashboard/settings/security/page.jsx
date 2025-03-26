"use client";

import { useState } from "react";
import {
  Label,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ToggleSwitch,
  Card,
} from "flowbite-react";

export default function ProfileSecurity() {
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: "Updated Billing Details", date: "March 25, 2025" },
    { id: 2, action: "Changed Subscription Plan", date: "March 22, 2025" },
  ]);

  const [settings, setSettings] = useState({
    readOnly: false,
    modifyPayments: false,
    otpEmail: true,
    otpPhone: false,
    twoFactorAuth: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold">Manage Account</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="read-only">Make account read-only for others</Label>
            <ToggleSwitch
              id="read-only"
              checked={settings.readOnly}
              onChange={() => toggleSetting("readOnly")}
              sizing="sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="modify-payments">
              Allow others to add or delete payment methods
            </Label>
            <ToggleSwitch
              id="modify-payments"
              checked={settings.modifyPayments}
              onChange={() => toggleSetting("modifyPayments")}
              sizing="sm"
            />
          </div>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Manage Security</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="otp-email">Send OTP via email</Label>
            <ToggleSwitch
              id="otp-email"
              checked={settings.otpEmail}
              onChange={() => toggleSetting("otpEmail")}
              sizing="sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="otp-phone">Send OTP via mobile</Label>
            <ToggleSwitch
              id="otp-phone"
              checked={settings.otpPhone}
              onChange={() => toggleSetting("otpPhone")}
              sizing="sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <Label htmlFor="2fa">Enable 2-Factor Authentication</Label>
              <p className="text-xs text-gray-500">
                (Available for mobile app users only)
              </p>
            </div>
            <ToggleSwitch
              id="2fa"
              checked={settings.twoFactorAuth}
              onChange={() => toggleSetting("twoFactorAuth")}
              sizing="sm"
            />
          </div>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Audit Logs</h2>
        <Table striped className="mt-4">
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Data Privacy & Compliance</h2>
        <p className="text-gray-600 mt-2">
          We comply with GDPR and other regulations to ensure your billing data
          is secure.
        </p>
      </Card>
    </div>
  );
}

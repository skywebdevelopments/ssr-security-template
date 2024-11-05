"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUserCAProfile } from "../../app/interfaces/IUserCAProfile";
import { useRouter } from "next/navigation";


export async function CAUsersTable({ session }: any) {

    const router = useRouter();
  const res = await fetch("http://localhost:3005/assets/1", {
    headers: {
      Authorization: `Bearer ${session.access_token}`, // Add Authorization header
      "Content-Type": "application/json", // Set content type
    },
  });

  const users: IUserCAProfile = await res.json();
  res.status === 401 || res.status === 403 && router.push('/login')

  return (
    <Table>
      <TableCaption>Identities enrolled in CA</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>UID</TableHead>
          <TableHead>TYPE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.result?.identities.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {users?.result?.identities.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

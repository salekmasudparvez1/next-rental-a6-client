
"use client"
import { DataTable } from '@/components/core/data-table/Table';
import { UserRowActions } from '@/components/module/auth/modal/UsersModal';
import SectionHeader from '@/components/module/sectionHeader/SectionHeader';
import { getAllUsers } from '@/service/auth/AuthService';
import { IUserForTable } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useEffect, useState } from 'react';




const AllUsersPage = () => {
    const [allUsers, setAllUsers] = useState<IUserForTable[]>([]);

    useEffect(() => {

        const fetchUsers = async () => {
            const response = await getAllUsers();
            setAllUsers(response?.data);
        }
        fetchUsers();
    }, []);

   

    const handleUpdate = (updatedUser: any) => {
        console.log('updated user',updatedUser);
    }

    const handleDelete = (id: string) => {
       console.log('deleted user',id);
    }

    const columns: ColumnDef<IUserForTable>[] = [
        {
            accessorKey: "No.",
            header: "No.",
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "photoURL",
            header: "Photo",
            cell: ({ row }) => (
                <Image
                    width={25}
                    height={25}
                    src={row?.original?.photoURL}
                    alt={row?.original?.username}
                    className="w-10 h-10 rounded-full object-cover"
                />
            ),
        },
        {
            accessorKey: "role",
            header: "Role",
        },
        {
            accessorKey: "username",
            header: "Username",
        },
        {
            accessorKey: "email",
            header: "Email",
        }, {
            accessorKey: "Actions",
            header: "Actions",
            cell: ({ row }) => (
                <div >
                    <UserRowActions user={row?.original} onUpdate={handleUpdate} onDelete={handleDelete} />
                </div>
            ),
        }
    ]


    return (
        <div className='p-5 space-y-4'>
            <SectionHeader
                title="All Users"
                subtitle="Users"
                description="Manage all users registered in the system."
            />
            <DataTable columns={columns} data={allUsers} />

        </div>
    );
}

export default AllUsersPage;



"use client"
import { DataTable } from '@/components/core/data-table/Table';
import { UserRowActions } from '@/components/module/auth/modal/UsersModal';
import SectionHeader from '@/components/module/sectionHeader/SectionHeader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UseerContext';
import { getAllUsers } from '@/service/user';

import { IUserForTable } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CheckCircle, ChevronDown, Clock, X, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';




const AllUsersPage = () => {
    const [allUsers, setAllUsers] = useState<IUserForTable[]>([]);
    // pagination state can be added here later
    const [pageCount, setPageCount] = useState(0)
    const { isLoading, setIsLoading } = useUser()
    const [selectedRows, setSelectedRows] = useState<number>(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const LoadData = async () => {
        try {
            setIsLoading(true);
            const response = await getAllUsers(pagination?.pageIndex, pagination?.pageSize);
            type UsersResponse = {
                data: IUserForTable[];
                meta: { total: number; limit: number, page: number };
            };

            const { data, meta } = response.data as UsersResponse;
            setAllUsers(data);
            setPageCount(Math.ceil(meta.total / meta.limit));

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch users";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        LoadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination?.pageIndex, pagination?.pageSize]);

    const handleSelectedRows = (data: unknown) => {
        console.log(data);
    }

    const handleUpdate = (updatedUser: unknown) => {
        console.log('updated user', updatedUser);
    }

    const handleDelete = (id: string) => {
        console.log('deleted user', id);
    }

    const columns: ColumnDef<IUserForTable>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
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
            accessorKey: "username",
            header: "Username",
            cell: ({ row }) => (
                <span className="font-medium text-xs">@{row?.original?.username}</span>
            ),
        },
        {
            accessorKey: "role",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown />
                </Button>
            ),
            enableSorting: true,
            cell: ({ row }) => (
                <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${row?.original?.role === 'admin' ? 'bg-blue-500' : row?.original?.role === 'landlord' ? 'bg-purple-500' : 'bg-gray-500'}  `}>
                    {row?.original?.role}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown />
                </Button>
            ),
            enableSorting: true,

            cell: ({ row }) => (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium ${row?.original?.status === 'approved' ? 'bg-green-500' : row?.original?.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                    {row?.original?.status === 'approved' ? (
                        <CheckCircle className="h-4 w-4" />
                    ) : row?.original?.status === 'pending' ? (
                        <Clock className="h-4 w-4" />
                    ) : (
                        <XCircle className="h-4 w-4" />
                    )}
                    <span className="capitalize">{row?.original?.status}</span>
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown />
                </Button>
            ),
            enableSorting: true,
            cell: ({ row }) => (
                <span className="text-xs">{row?.original?.email}</span>
            ),
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


            {selectedRows > 0 &&
                <div className='flex justify-between items-center px-2 py-1 bg-gray-300'>
                    <div className='text-sm flex justify-between items-center'>
                        <span className='font-bold'>{selectedRows}</span> -<span className='ml-1'>Selected</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="ml-auto rounded">
                                Take Action <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='rounded border-0'>
                            <Button variant="outline" className="w-full justify-start border-0 border-b border-b-gray-300 rounded-none" >Change Status</Button>
                            <Button variant="outline" className="w-full justify-start border-0" >Change Role</Button>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>}
            {isLoading ?
                null :
                <DataTable
                    columns={columns}
                    data={allUsers}
                    manualPagination={true}
                    pageCount={pageCount}
                    onPaginationChange={setPagination}
                    onSelectionChange={(row) => {
                        setSelectedRows(row?.length);
                        handleSelectedRows(row)
                    }
                    }


                />}

        </div>
    );
}

export default AllUsersPage;


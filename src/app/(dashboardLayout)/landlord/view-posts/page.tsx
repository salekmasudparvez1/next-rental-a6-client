'use client';

import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/core/data-table/Table';
import SectionHeader from '@/components/module/sectionHeader/SectionHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { getAllPosts } from '@/service/post/postService';
import { Bed, Edit, Eye, MapPinCheck, MoreHorizontal, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { RentalHouseFormData } from '@/types/post';
import { useRouter } from 'next/navigation';
import ViewPostSkeleton from '@/components/module/loading/ViewPostSkeleton';


export interface IFeature {
  name: string;
  color: string;
}


const ViewPostPage = () => {
  const [postData, setPostData] = useState<RentalHouseFormData[]>([]);
  const [selectedPost, setSelectedPost] = useState<RentalHouseFormData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const router = useRouter();


  const openViewDialog = (post: RentalHouseFormData) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    // keep selectedPost for a moment (or clear it)
    setTimeout(() => setSelectedPost(null), 150);
  };

  const columns = useMemo<ColumnDef<RentalHouseFormData>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => {
          const post = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {post.images && post.images.length > 0 ? (
                  <AvatarImage src={post.images[0]} alt={post.title} />
                ) : (
                  <AvatarFallback>{(post.title || '').slice(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-medium line-clamp-1">{post.title}</span>
                {post.location?.streetAddress && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPinCheck className="h-3.5 w-3.5 opacity-70" /> {post.location.streetAddress}
                  </span>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'rentAmount',
        header: 'Rent Amount',
        cell: ({ row }) => {
          const { rentAmount, bedroomNumber } = row.original;
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(Number(rentAmount ?? 0));
          return (
            <div className="flex flex-col">
              <span className="font-semibold">{formatted}</span>
              {bedroomNumber && <span className="text-xs text-muted-foreground">/{bedroomNumber}</span>}
            </div>
          );
        },
      },
      {
        accessorKey: 'bedroomNumber',
        header: 'Bedrooms',
        cell: ({ row }) => {
          const { bedroomNumber } = row.original;
          return (
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{bedroomNumber ?? '-'}</span>
            </div>
          );
        },
        enableSorting: true,
        meta: { align: 'center' },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status: string = row.original.status ?? 'unknown';
          const key = status.toLowerCase();
          const variant =
            key === 'available' ? 'default' : key === 'rented' ? 'destructive' : key === 'maintenance' ? 'outline' : 'secondary';
          return (
            <Badge variant={variant} className="uppercase">
              {status}
            </Badge>
          );
        },
        enableSorting: true,
        meta: { align: 'center' },
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const post = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" side="bottom" className="w-44">
                <DropdownMenuItem
                  onClick={() => {
                    openViewDialog(post);
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" /> View
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push(`/landlord/view-posts/${post._id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    // implement delete logic
                    console.log('delete', post);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [router] // router is used in the Edit action
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getAllPosts(pagination?.pageIndex, pagination?.pageSize);
        console.log('Fetched response:', response);
        
        type PostsResponse = {
          data: RentalHouseFormData[];
          meta: { total: number; limit: number, page: number };
        };
        

        const { data, meta } = response.data as PostsResponse  
        setPostData(data || []);
        setPageCount(meta ? Math.ceil(meta.total / meta.limit) : 0);

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch users";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [pagination?.pageIndex, pagination?.pageSize]);

  if (isLoading) {
    return <ViewPostSkeleton/>;
  }

  return (
    <div className='p-5 space-y-4'>
      <SectionHeader title="All Posts" subtitle="Posts" description="Manage all posts registered in the system." />
    
      <DataTable
        data={postData}
        columns={columns}
        manualPagination={true}
        pageCount={pageCount}
        onPaginationChange={setPagination}
      />

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => (open ? setIsDialogOpen(true) : closeDialog())}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
            <DialogDescription>Full information for the selected post.</DialogDescription>
          </DialogHeader>

          {selectedPost ? (
            <div className="space-y-4 mt-2">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  {selectedPost.images ? (
                    <AvatarImage src={selectedPost.images[0]} alt={selectedPost.title} />
                  ) : (
                    <AvatarFallback>{(selectedPost.title || '').slice(0, 2).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold">{selectedPost.title}</h3>
                  {selectedPost.location && (
                    <div className="text-sm text-muted-foreground space-y-1 mt-1">
                      <p className="flex items-center gap-2">
                        <MapPinCheck className="h-4 w-4" /> 
                        <span>
                          {selectedPost.location.streetAddress}
                          {selectedPost.location.subDistrict && `, ${selectedPost.location.subDistrict}`}
                          {selectedPost.location.district && `, ${selectedPost.location.district}`}
                          {selectedPost.location.division && `, ${selectedPost.location.division}`}
                        </span>
                      </p>
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {/* Status */}
                    {/* @ts-expect-error variant prop possibly */}
                    <Badge variant={selectedPost?.status === 'available' ? 'success' : selectedPost?.status === 'rented' ? 'destructive' : selectedPost?.status === 'maintenance' ? 'outline' : 'secondary'}>
                      {selectedPost?.status}
                    </Badge>

                    {/* Rent */}
                    <div className="text-sm">
                      <span className="font-medium">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(
                          Number(selectedPost.rentAmount ?? 0)
                        )}
                      </span>
                      /month
                    </div>

                    {/* Bedrooms */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Bed className="h-4 w-4" /> <span>{selectedPost.bedroomNumber ?? '-'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedPost?.description && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedPost.description}</p>
                </div>
              )}

              {/* Features */}
              {selectedPost?.features?.length ? (
                <div>
                  <h4 className="text-sm font-medium mb-1">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.features.map((f, idx) => (
                      <Badge key={idx} className="uppercase">
                        {f.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Images gallery */}
              {selectedPost.images?.length ? (
                <div>
                  <h4 className="text-sm font-medium mb-2">Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedPost?.images?.map((src, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={idx} src={src} alt={`${selectedPost?.title} ${idx + 1}`} className="h-32 w-full object-cover rounded-md" />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">No post selected.</div>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" onClick={closeDialog}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewPostPage;
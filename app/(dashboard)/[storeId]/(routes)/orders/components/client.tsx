"use client"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrderClinetProps {
    data:OrderColumn[]
}

export const OrderClient = ({
    data
}:OrderClinetProps) =>{

    return (
        <>
            <Heading
            title={`Orders (${data.length})`}
            description="Manage orders for your store"
            />
        <Separator />
        <DataTable columns={columns} data={data} searchKey="products"/>
        </>
    )
}
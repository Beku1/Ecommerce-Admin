import prismadb from "@/lib/prisma.db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        const {userId} = auth()
        const body = await req.json()
        
        const {name} = body

        console.log('name',name)
        
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }

        if(!name){
            return new NextResponse("Name is required",{status:400})
        }

        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }

        const store = await prismadb.store.updateMany({
            where:{
                id:params.storeId,
                userId
            },
            data:{
                name
            }
        })



        return NextResponse.json(store)
    }
    catch(err){
        console.log('[STORE_PATCH]',err)
        return new NextResponse("Internal error",{status:500})
    }
}



export async function DELETE(
    _req:Request,
    {params}:{params:{storeId:string}}
){
    try{
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }


        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }

        const store = await prismadb.store.deleteMany({
            where:{
                id:params.storeId,
                userId
            }
        })



        return NextResponse.json(store)
    }
    catch(err){
        console.log('[STORE_DELETE]',err)
        return new NextResponse("Internal error",{status:500})
    }
}
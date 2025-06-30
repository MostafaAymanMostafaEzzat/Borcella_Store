import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function Collections() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
  const collections = res.data as CollectionType[] | undefined;
  console.log(res.data);
  return (
    <div className="m-20 pb-10 h-full">
      <h1 className="font-bold text-6xl text-center mb-8">Collections</h1>
      <div className="flex gap-10 items-center h-full">
        {!collections || collections.length === 0 ? (
          <p className="text-body-bold">No collections found</p>
        ) : (
          collections.map((collection) => (
            <Link
              key={collection._id}
              className="shadow-xl "
              href={`/collections/${collection._id}`}
            >
              
                <Image width={400} height={400} src={collection.image} alt="collection-image " className="max-h-48 object-cover"  />
              
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

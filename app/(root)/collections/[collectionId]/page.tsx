

export default async function CollectionPage( { params } : { params: Promise<{ collectionId: string }> }) {
  const  { collectionId} = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch collection');
  }
  const collection = await res.json();
  
  return (
    <div className="m-5 pb-10 text-slate-500"> 
        <img className="w-11/12 h-96 object-cover mb-8 mx-auto " src={collection.image} alt="Collection Image" />
        <h1 className="text-3xl font-bold text-center mb-4">{collection.title}</h1>
        <p className="text-center  mb-8">{collection.description}</p>
        
    </div>
  );
}
import { Link } from "react-router-dom";

type ItemCardProps = {
    id: number;
    name: string;
    image: string | null;
};

export default function ItemCard({ id, name, image }: ItemCardProps) {
    return (
        <Link to={`/items/${id}`} className="block">
            <div className="aspect-square w-full overflow-hidden bg-gray-200">
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                        No Image
                    </div>
                )}
            </div>

            <p className="mt-2 text-sm">{name}</p>
        </Link>
    );
}
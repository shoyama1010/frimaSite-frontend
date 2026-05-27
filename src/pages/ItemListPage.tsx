import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";

type Item = {
    id: number;
    name: string;
    price: string;
    condition: string;
    is_sold: boolean;
    status: string;
    image_url: string;
};

type ApiResponse = {
    data: Item[];
};

export default function ItemListPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchItems = async (searchKeyword = "") => {
        setLoading(true);

        const query = searchKeyword ? `?keyword=${encodeURIComponent(searchKeyword)}` : "";
        const response = await fetch(`http://localhost/api/items${query}`);

        const result: ApiResponse = await response.json();

        setItems(result.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchItems(keyword);
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="flex h-[70px] items-center justify-between bg-black px-8">
                <div className="text-3xl font-bold text-white">COACHTECH</div>

                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="なにをお探しですか？"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        className="w-[420px] rounded-sm bg-white px-4 py-2 text-sm outline-none"
                    />
                </form>

                <nav className="flex items-center gap-8 text-sm font-bold text-white">
                    {localStorage.getItem("auth_token") ? (
                        <>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("auth_token");
                                    localStorage.removeItem("auth_user");
                                    window.location.href = "/login";
                                }}
                            >
                                ログアウト
                            </button>

                            <a href="#">マイページ</a>
                        </>
                    ) : (
                        <Link to="/login">ログイン</Link>
                    )}

                    <a
                        className="rounded bg-white px-4 py-2 text-black"
                        href="#"
                    >
                        出品
                    </a>
                </nav>
            </header>

            <main>
                <div className="flex gap-20 border-b border-gray-400 px-32 pt-16 pb-4 font-bold">
                    <button>おすすめ</button>
                    <button>マイリスト</button>
                </div>

                {loading ? (
                    <p className="px-20 py-16">読み込み中...</p>
                ) : (
                    <div className="grid grid-cols-6 gap-x-3 gap-y-8 px-20 py-16">
                        {items.map((item) => (
                            <ItemCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image_url}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
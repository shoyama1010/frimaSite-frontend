import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Comment = {
    id: number;
    content: string;
    created_at: string | null;
    user: {
        id: number | null;
        name: string | null;
    };
};

type ItemDetail = {
    id: number;
    name: string;
    price: string;
    description: string;
    condition: string;
    image_url: string | null;
    is_sold: boolean;
    status: string;
    likes_count: number;
    comments_count: number;
    liked_by_me: boolean;
    categories: {
        id: number;
        name: string;
    }[];
    comments: Comment[];
};

type ApiResponse = {
    data: ItemDetail;
};

export default function ItemDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState<ItemDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            const response = await fetch(`http://localhost/api/items/${id}`);
            const result: ApiResponse = await response.json();

            setItem(result.data);
            setLoading(false);
        };

        fetchItem();
    }, [id]);

    // いいね処理
    const handleToggleLike = async () => {
        if (!item) return;

        const token = localStorage.getItem("auth_token");

        if (!token) {
            alert("いいねするにはログインが必要です。");
            return;
        }

        const response = await fetch(
            `http://localhost/api/items/${item.id}/toggle-like`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 401) {
            alert("いいねするにはログインが必要です。");
            return;
        }

        const result = await response.json();

        setItem({
            ...item,
            liked_by_me: result.liked_by_me,
            likes_count: result.likes_count,
        });
    };
    // const handleToggleLike = async () => {
    //     console.log("いいねクリック");
    //     if (!item) return;
    //     const response = await fetch(
    //         `http://localhost/api/items/${item.id}/toggle-like`,
    //         {
    //             method: "POST",
    //             // credentials: "include",
    //             headers: {
    //                 Accept: "application/json",
    //             },
    //         }
    //     );

    //     if (response.status === 401) {
    //         alert("いいねするにはログインが必要です。");
    //         return;
    //     }

    //     const result = await response.json();
    //     setItem({
    //         ...item,
    //         liked_by_me: result.liked_by_me,
    //         likes_count: result.likes_count,
    //     });
    // };


    if (loading) {
        return <p className="p-10">読み込み中...</p>;
    }

    if (!item) {
        return <p className="p-10">商品が見つかりませんでした。</p>;
    }


    return (
        <div className="min-h-screen bg-white">
            <header className="flex h-[70px] items-center justify-between bg-black px-8">
                <Link to="/" className="text-3xl font-bold text-white">
                    COACHTECH
                </Link>

                <input
                    type="text"
                    placeholder="なにをお探しですか？"
                    className="w-[420px] rounded-sm bg-white px-4 py-2 text-sm outline-none"
                />

                <nav className="flex items-center gap-8 text-sm font-bold text-white">
                    {localStorage.getItem("auth_token") ? (
                        <>
                            <button
                                type="button"
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

                    <a className="rounded bg-white px-4 py-2 text-black" href="#">
                        出品
                    </a>
                </nav>
            </header>

            <main className="mx-auto grid max-w-[1200px] grid-cols-2 gap-16 px-10 py-16">
                <div className="aspect-square overflow-hidden bg-gray-200">
                    {item.image_url ? (
                        <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold">{item.name}</h1>
                    <p className="mt-2 text-2xl">¥{Number(item.price).toLocaleString()}</p>

                    <div className="mt-6 flex gap-8">
                        <div>
                            <button
                                type="button"
                                onClick={handleToggleLike}
                                className="text-3xl"
                            >
                                {item.liked_by_me ? "♥" : "♡"}
                            </button>
                            <p className="text-center text-sm">{item.likes_count}</p>
                        </div>

                        <div>
                            <div className="text-3xl">💬</div>
                            <p className="text-center text-sm">{item.comments_count}</p>
                        </div>
                    </div>

                    <button className="mt-6 w-full rounded bg-red-500 py-3 font-bold text-white">
                        購入手続きへ
                    </button>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold">商品説明</h2>
                        <p className="mt-4 leading-7">{item.description}</p>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold">商品の情報</h2>

                        <div className="mt-4 space-y-4">
                            <div className="flex gap-8">
                                <span className="w-24 font-bold">カテゴリー</span>
                                <div className="flex flex-wrap gap-2">
                                    {item.categories.length > 0 ? (
                                        item.categories.map((category) => (
                                            <span
                                                key={category.id}
                                                className="rounded-full bg-gray-200 px-3 py-1 text-sm"
                                            >
                                                {category.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span>-</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-8">
                                <span className="w-24 font-bold">商品の状態</span>
                                <span>{item.condition}</span>
                            </div>
                        </div>
                    </section>

                    <section className="mt-10">
                        <h2 className="text-xl font-bold">
                            コメント({item.comments_count})
                        </h2>

                        <div className="mt-4 space-y-4">
                            {item.comments.length > 0 ? (
                                item.comments.map((comment) => (
                                    <div key={comment.id} className="rounded bg-gray-100 p-4">
                                        <p className="font-bold">{comment.user.name ?? "ゲスト"}</p>
                                        <p className="mt-2">{comment.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p>コメントはまだありません。</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
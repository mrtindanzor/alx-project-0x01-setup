import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import Header from "@/components/layout/Header";
import { UserProps } from "@/interfaces";
import { useCallback, useState } from "react";

const UsersPage: React.FC<{ posts: UserProps[] }> = ({ posts: allPosts }) => {
  const [posts, setPosts] = useState(allPosts);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = useCallback((data: UserProps) => {
    setPosts((posts) => [{ ...data, id: posts.length + 1 }, ...posts]);
    setModalOpen(false);
  }, []);
  return (
    <main>
      <Header />
      <div className="flex justify-end py-3 px-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-700 px-4 py-2 rounded-full text-white"
        >
          Sign up
        </button>
      </div>

      <ul className="py-4 px-4 grid md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
        {posts.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </ul>

      {isModalOpen && (
        <UserModal
          onClose={() => setModalOpen(false)}
          onSubmit={(user) => handleSubmit(user as unknown as UserProps)}
        />
      )}
    </main>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default UsersPage;

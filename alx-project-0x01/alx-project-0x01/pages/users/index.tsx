import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import Header from "@/components/layout/Header";
import { UserProps } from "@/interfaces";
import { useCallback, useState } from "react";

const UsersPage: React.FC<{ users: UserProps[] }> = ({ users: allUsers }) => {
  const [users, setUsers] = useState(allUsers);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = useCallback((data: UserProps) => {
    setUsers((users) => [{ ...data, id: users.length + 1 }, ...users]);
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
        {users.map((user) => (
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
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
}

export default UsersPage;

import { useMyState } from "@/hooks/useUpdateState";
import { UserModalProps, UserProps } from "@/interfaces";
import React, { useEffect } from "react";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
  const [user, setUser] = useMyState<UserProps>({
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipCode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  console.log(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser(name, value);
  };

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-700/40 z-100 overflow-y-auto py-4">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Post</h2>
        <form onSubmit={handleSubmit} className="h-full overflow-hidden">
          <Wrapper title="Contact">
            <Input
              title="Name"
              value={user.name}
              path="name"
              setUser={setUser}
            />
            <Input
              title="Username"
              value={user.username}
              path="username"
              setUser={setUser}
            />
            <Input
              title="Phone"
              value={user.phone}
              path="phone"
              setUser={setUser}
            />
            <Input
              title="Email"
              value={user.email}
              path="email"
              setUser={setUser}
            />
            <Input
              title="Website"
              value={user.website}
              path="website"
              setUser={setUser}
            />
          </Wrapper>

          <Wrapper title="Address">
            <Input
              title="Street"
              value={user.address?.street}
              path="address.street"
              setUser={setUser}
            />
            <Input
              title="Suite"
              value={user.address?.suite}
              path="address.suite"
              setUser={setUser}
            />
            <Input
              title="City"
              value={user.address?.city}
              path="address.city"
              setUser={setUser}
            />
            <Input
              title="Zip code"
              value={user.address?.zipCode}
              path="address.zipCode"
              setUser={setUser}
            />
            <Input
              title="Lat"
              value={user.address?.geo.lat}
              path="address.geo.lat"
              setUser={setUser}
            />
            <Input
              title="Lng"
              value={user.address?.geo.lng}
              path="address.geo.lng"
              setUser={setUser}
            />
          </Wrapper>

          <Wrapper title="Company">
            <Input
              title="Name"
              value={user.company?.name}
              path="company.name"
              setUser={setUser}
            />
            <Input
              title="Phrase"
              value={user.company?.catchPhrase}
              path="company.catchPhrase"
              setUser={setUser}
            />
            <Input
              title="BS"
              value={user.company?.bs}
              path="company.bs"
              setUser={setUser}
            />
          </Wrapper>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;

function Input({
  setUser,
  path,
  title,
  value,
}: {
  title: string;
  value?: string | undefined;
  path: string;
  setUser: (path: string, value: unknown) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
        {title}
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={(e) => setUser(path, e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter post title"
      />
    </div>
  );
}

function TextArea({
  setUser,
  path,
  title,
  value,
}: {
  title: string;
  value?: string | undefined;
  path: string;
  setUser: (path: string, value: unknown) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
        {title}
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={(e) => setUser(path, e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter post title"
      />
    </div>
  );
}

function Wrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid h-fit gap-2 my-4 *:last:px-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      {children}
    </section>
  );
}

import { AddressProps, CompanyProps, UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({
  id,
  name,
  username,
  email,
  address,
  website,
  company,
  phone,
}) => {
  return (
    <div className="bg-white grid cursor-pointer outline-2 *:not-first:not-last:border-b *:not-first:not-last:pb-4 *:not-first:not-last:border-b-sky-300 outline-sky-600 text-gray-800 px-2 py-4 rounded-xl shadow hover:-translate-y-1 transition-transform duration-200 ease-linear">
      <h1 className="text-lg text-sky-600 font-semibold">{name}</h1>

      <Contact
        phone={phone}
        email={email}
        website={website}
        username={username}
      />
      <Address address={address} />
      <Company company={company} />

      <span className="ml-auto block w-fit px-2 py-1">user: {id}</span>
    </div>
  );
};

function Contact({
  email,
  phone,
  website,
  username,
}: Pick<UserProps, "email" | "phone" | "website" | "username">) {
  return (
    <section className="grid gap-1 my-4">
      <h2 className="font-semibold text-black text-lg">Contact</h2>

      <ul className="grid grid-cols-2 gap-2 px-2 py-1 rounded-md *:grid *:gap-0.5 *:*:first:font-semibold *:*:first:text-sm">
        <li>
          <span id={`username:${username}`}>Username:</span>
          <span aria-labelledby={`username:${username}`}>{username}</span>
        </li>
        <li>
          <span id={`email:${email}`}>Email:</span>
          <span aria-labelledby={`email:${email}`}>{email}</span>
        </li>

        <li>
          <span id={`phone:${phone}`}>Phone:</span>
          <span aria-labelledby={`phone:${phone}`}>{phone}</span>
        </li>

        <li>
          <span id={`website:${website}`}>website:</span>
          <span aria-labelledby={`website:${website}`}>{website}</span>
        </li>
      </ul>
    </section>
  );
}
function Address({
  address: { street, geo, city, suite, zipCode },
}: {
  address: AddressProps;
}) {
  return (
    <section className="grid gap-1 my-4">
      <h2 className="font-semibold text-black text-lg">Address</h2>

      <ul className="grid grid-cols-2 gap-2 px-2 py-1 rounded-md *:grid *:gap-0.5 *:*:first:font-semibold *:*:first:text-sm">
        <li>
          <span id={`street:${street}`}>Street:</span>
          <span aria-labelledby={`street:${street}`}>{street}</span>
        </li>
        <li>
          <span id={`suite:${street}`}>Suite:</span>
          <span aria-labelledby={`suite:${suite}`}>{suite}</span>
        </li>
        <li>
          <span id={`city:${city}`}>City:</span>
          <span aria-labelledby={`city:${city}`}>{city}</span>
        </li>
        {zipCode && (
          <li>
            <span id={`zipCode:${zipCode}`}>Zip code:</span>
            <span aria-labelledby={`zipCode:${zipCode}`}>{zipCode}</span>
          </li>
        )}

        <li className="col-span-full">
          <span id={`geo:${street}`}>Geo location:</span>
          <div
            aria-labelledby={`geo:${street}`}
            className="grid grid-cols-2 gap-2"
          >
            <span>LAT: {geo.lat}</span>
            <span>LNG: {geo.lng}</span>
          </div>
        </li>
      </ul>
    </section>
  );
}

function Company({
  company: { name, bs, catchPhrase },
}: {
  company: CompanyProps;
}) {
  return (
    <section className="grid gap-1 my-4">
      <h2 className="font-semibold text-black text-lg">Company</h2>

      <ul className="grid gap-2 px-2 py-1 rounded-md *:grid *:gap-0.5 *:*:first:font-semibold *:*:first:text-sm">
        <li>
          <span id={`company:${name}`}>Name:</span>
          <span aria-labelledby={`name:${name}`}>{name}</span>
        </li>
        <li>
          <span id={`catchprase:${catchPhrase}`}>Phrase:</span>
          <span aria-labelledby={`catchPhrase:${catchPhrase}`}>
            {catchPhrase}
          </span>
        </li>
        <li>
          <span id={`bs:${bs}`}>BS:</span>
          <span aria-labelledby={`bs:${bs}`}>{bs}</span>
        </li>
      </ul>
    </section>
  );
}

export default UserCard;

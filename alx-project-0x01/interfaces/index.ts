import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> 

export interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface AddressProps {
  street: string
  suite: string
  city: string
  zipCode: string
  geo: {
    lat: string
    lng: string
  }
}

export interface CompanyProps {
  name: string
  catchPhrase: string
  bs: string
}

export interface UserProps {
  id: number
  name: string
  username: string
  email: string
  address: AddressProps
  phone: string
  website: string
  company: CompanyProps
}

export interface PostData {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

export interface PostModalProps {
  onClose: () => void;
  onSubmit: (post: PostData) => void;
}

export interface UserModalProps {
  onClose: () => void;
  onSubmit: (user: UserProps) => void;
}
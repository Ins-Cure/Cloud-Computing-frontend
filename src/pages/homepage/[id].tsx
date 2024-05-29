import { useRouter } from "next/router";

export default function Profile() {
  const { id } = useRouter().query;
  return <div>ini: {id}</div>;
}

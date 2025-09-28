import type { NextPage } from "next";
import { redirect, RedirectType } from "next/navigation";

const Page: NextPage<{
  params: Promise<{ party: string }>;
}> = async (props) => {
  const params = await props.params;
  return redirect(`/parties/${params.party}/movies`, RedirectType.replace);
};

export default Page;

import { redirect } from "next/navigation";

const page = () => {
    redirect("/admin/orders");

};

export default page;
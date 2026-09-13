import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const verifyAdmin = async (token) => {
  if (!token || !process.env.ADMIN_SESSION_SECRET) {
    return false;
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.ADMIN_SESSION_SECRET
    );

    const { payload } = await jwtVerify(token, secret);

    return payload.role === "admin";
  } catch {
    return false;
  }
};

const Layout = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  const isAdmin = await verifyAdmin(token);

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return children;
};

export default Layout;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuthContext from "@wepresto/context/auth-context";
import signOut from "@wepresto/firebase/sign-out";

export default function ValidateUser({ type }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!type) {
      if (user && user.borrower) return router.push("/borrower");
      if (user && user.lender) return router.push("/lender");
    }

    if (type === "borrower") {
      if (!user) return router.push("/");
      if (user && !user.borrower && user.lender) return router.push("/lender");
    }

    if (type === "lender") {
      if (!user) return router.push("/");
      if (user && !user.lender && user.borrower) return router.push("/borrower");
      if (user && !user.borrower && !user.lender) return signOut();
    }

    if (user && !user.borrower && !user.lender) return signOut();
  }, [router, user, type]);
}
